const Tariff = require("../models/Tariff");
const UserInfo = require("../models/UserInfo");
const MeterInfo = require("../models/MeterInfo");
const FixedSetting = require("../models/FixedSetting");
const TemplateBillData = require("../models/TemplateBillData");
const UploadOnceBillData = require("../models/UploadOnceBillData");
const DateSetting = require("../models/DateSetting");

// FIXED SETTINGS VALUES - GLOBAL VARIABLES
let fixedSettingsGlobal = {};

// CONTROLLER FUNCTION TO FETCH ALL METER INFO DATA
const getAllMeterInfo = async (req, res) => {
  try {
    const meterInfo = await MeterInfo.find();
    res.status(200).json({ meterInfo });
  } catch (error) {
    console.log("Error fetching meter info:", error);
    res.status(500).json({ message: "Failed to fetch meter info" });
  }
};

const addMeterInfo = async (req, res) => {
  try {
    // Start by fetching all necessary data in parallel
    const [
      residentailTariffValues,
      fixedSettings,
      dateSettingsValues,
      lastMonthYearId
    ] = await Promise.all([
      Tariff.find(),
      FixedSetting.find(),
      DateSetting.find({}),
      getLastMonthYearId()
    ]);

    // Process tariff values
    const tariffSlabs = residentailTariffValues.reduce((acc, tariff) => {
      if (tariff.name === "peakValue") acc.peak = tariff.value;
      if (tariff.name === "offPeakValue") acc.offPeak = tariff.value;
      return acc;
    }, { peak: 0, offPeak: 0 });

    // Process fixed settings
    fixedSettingsGlobal = fixedSettings.reduce((acc, setting) => {
      acc[setting.name] = setting.value;
      return acc;
    }, {});

    // Process date settings
    const dateSettingData = dateSettingsValues[0].dateSettings.reduce(
      (acc, obj) => {
        acc[obj.key] = obj.value;
        return acc;
      },
      {}
    );

    const { currentMonthYearId, meterInfoArray } = req.body;

    // Process meter infos in chunks to prevent timeout
    const CHUNK_SIZE = 5;
    const chunks = [];
    for (let i = 0; i < meterInfoArray.length; i += CHUNK_SIZE) {
      chunks.push(meterInfoArray.slice(i, i + CHUNK_SIZE));
    }

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (meterInfo) => {
          const { userId, present_peak_reading, present_off_peak_reading } = meterInfo;

          // Find previous meter info
          const previousMeterInfo = await UploadOnceBillData.findOne({ userId });
          if (!previousMeterInfo?.previousReadings?.length) {
            throw new Error(`No previous readings found for userId: ${userId}`);
          }

          const previousReadingIndex = previousMeterInfo.previousReadings.length -
            (lastMonthYearId == currentMonthYearId ? 2 : 1);

          // Calculate total units for FPA
          const tempIndex = previousMeterInfo.previousReadings.length;
          const totalUnitsForFpaCalc = calculateTotalUnitsForFPA(
            previousMeterInfo.previousReadings,
            tempIndex,
            lastMonthYearId,
            currentMonthYearId
          );

          // Calculate template bill data
          const templateBillData = await calculateTemplateBillData(
            previousMeterInfo.previousReadings[previousReadingIndex].previous_peak,
            previousMeterInfo.previousReadings[previousReadingIndex].previous_off_peak,
            present_peak_reading,
            present_off_peak_reading,
            totalUnitsForFpaCalc,
            tariffSlabs
          );

          // Get user data and process readings in parallel
          const [userData, processedReadings] = await Promise.all([
            UserInfo.find({ userId }),
            processReadingsData(previousMeterInfo, lastMonthYearId, currentMonthYearId)
          ]);

          // Combine all template data
          const finalTemplateData = {
            ...templateBillData,
            ...getBasicUserData(userData[0]),
            ...getTariffData(tariffSlabs),
            ...dateSettingData,
            ...processedReadings
          };

          // Save data in parallel
          await Promise.all([
            new MeterInfo(meterInfo).save(),
            new TemplateBillData(finalTemplateData).save(),
            updateUploadOnceBillData(
              previousMeterInfo,
              present_peak_reading,
              present_off_peak_reading,
              currentMonthYearId,
              lastMonthYearId
            )
          ]);
        })
      );
    }

    res.status(200).json({ message: "Meter info added successfully" });
  } catch (error) {
    console.error("Error adding meter info:", error);
    res.status(500).json({ message: "Failed to add meter info" });
  }
};

// Helper functions
const calculateTotalUnitsForFPA = (readings, tempIndex, lastMonthYearId, currentMonthYearId) => {
  if (lastMonthYearId != currentMonthYearId) {
    return readings[tempIndex - 3].previous_peak - readings[tempIndex - 4].previous_peak +
      (readings[tempIndex - 3].previous_off_peak - readings[tempIndex - 4].previous_off_peak);
  }
  return readings[tempIndex - 4].previous_peak - readings[tempIndex - 5].previous_peak +
    (readings[tempIndex - 4].previous_off_peak - readings[tempIndex - 5].previous_off_peak);
};

const processReadingsData = async (previousMeterInfo, lastMonthYearId, currentMonthYearId) => {
  const readingsArray = previousMeterInfo.previousReadings;
  const previous13ReadingsArray = lastMonthYearId != currentMonthYearId
    ? readingsArray.slice(-13)
    : readingsArray.slice(0, 13);

  const unitsArray = previous13ReadingsArray.slice(1).map((reading, index) => {
    const peakUnits = reading.previous_peak - previous13ReadingsArray[index].previous_peak;
    const offPeakUnits = reading.previous_off_peak - previous13ReadingsArray[index].previous_off_peak;
    return peakUnits + offPeakUnits;
  });

  const previous12MonthsData = lastMonthYearId != currentMonthYearId
    ? readingsArray.slice(-12)
    : readingsArray.slice(1, 13);

  return {
    months: previous12MonthsData.map(reading => reading.month),
    units: unitsArray,
    payments: previous12MonthsData.map(reading => reading.payment),
    bills: previous12MonthsData.map(reading => reading.bill)
  };
};

const getBasicUserData = (userData) => ({
  userId: userData.userId,
  name: userData.name,
  location: userData.location,
  tariffCategory: userData.tariffCategory,
  phase: userData.phase,
  meterType: userData.meterType
});

const getTariffData = (tariffSlabs) => ({
  tariffPeakValue: tariffSlabs.peak,
  tariffOffPeakValue: tariffSlabs.offPeak
});

const updateUploadOnceBillData = async (
  previousMeterInfo,
  present_peak_reading,
  present_off_peak_reading,
  currentMonthYearId,
  lastMonthYearId
) => {
  if (lastMonthYearId != currentMonthYearId) {
    const previousReadingsArrayOfMeter = previousMeterInfo.previousReadings;
    previousReadingsArrayOfMeter.shift();
    previousReadingsArrayOfMeter.push({
      previous_peak: present_peak_reading,
      previous_off_peak: present_off_peak_reading,
      month: currentMonthYearId,
      payment: 0,
      bill: 0
    });
    return UploadOnceBillData.updateOne(
      { _id: previousMeterInfo._id },
      { $set: { previousReadings: previousReadingsArrayOfMeter } }
    );
  } else {
    const lastIndex = previousMeterInfo.previousReadings.length - 1;
    previousMeterInfo.previousReadings[lastIndex] = {
      previous_peak: present_peak_reading,
      previous_off_peak: present_off_peak_reading,
      month: currentMonthYearId,
      payment: 0,
      bill: 0
    };
    return previousMeterInfo.save();
  }
};

// Export the functions
module.exports = {
    getAllMeterInfo,
    addMeterInfo
};