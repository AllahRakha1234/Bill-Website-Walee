const Tariff = require("../models/Tariff");
const UserInfo = require("../models/UserInfo");
const MeterInfo = require("../models/MeterInfo");
const FixedSetting = require("../models/FixedSetting");
const TemplateBillData = require("../models/TemplateBillData");
const UploadOnceBillData = require("../models/UploadOnceBillData");
const {
  calculateElectricCost,
  calculateGST,
  calculateQtrTex,
  calculateFPA,
  calculateFC,
} = require("../utils/BillCalcFormulas");

// FIXED SETTINGS VALUES - GLOBAL VARIABLES
let fixedSettingsGlobal = {};

// Fetch all meter info
const getAllMeterInfo = async (req, res) => {
  try {
    const meterInfo = await MeterInfo.find();
    res.status(200).json({ meterInfo });
  } catch (error) {
    console.log("Error fetching meter info:", error);
    res.status(500).json({ message: "Failed to fetch meter info" });
  }
};

// FUNCTION TO CALCULATE TEMPLATE BILL DATA
const calculateTemplateBillData = async (
  previousPeakReading,
  previousOffPeakReading,
  present_peak_reading,
  present_off_peak_reading,
  totalUnitsForFpaCalc,
  tariffSlabs
) => {
  // BELOW ADDRESS SECTION
  const peakUnits = present_peak_reading - previousPeakReading;
  const offPeakUnits = present_off_peak_reading - previousOffPeakReading;
  const totalUnits = peakUnits + offPeakUnits;

  previousReadingPeak = previousPeakReading;
  previousReadingOffPeak = previousOffPeakReading;
  presentReadingPeak = present_peak_reading;
  presentReadingOffPeak = present_off_peak_reading;
  mfValue = 1; // Meter Factor Value

  // ELECTRICITY + GOVT CHARGES SECTION
  const costOfElectricity = await calculateElectricCost(
    peakUnits,
    offPeakUnits,
    tariffSlabs
  );
  const qtrTex = await calculateQtrTex(
    totalUnits,
    fixedSettingsGlobal["QTR Rate"]
  );
  const fcSurcharge = await calculateFC(
    totalUnits,
    fixedSettingsGlobal["FC Rate"]
  );
  const gst = await calculateGST(costOfElectricity, fcSurcharge, qtrTex);
  // Here totalUnits = totalunits of month before current and previous 2 months (For August it will be of May)
  const fuelPriceAdjustment = await calculateFPA(
    totalUnitsForFpaCalc,
    fixedSettingsGlobal["FPA Rate"],
    fixedSettingsGlobal["edOnFpa Rate"],
    fixedSettingsGlobal["gstOnFpa Rate"]
  );
  const fixedCharges = fixedSettingsGlobal["Fixed Charges"];
  const ptvFee = fixedSettingsGlobal["TV Fee"];
  const meterRent = fixedSettingsGlobal["Meter Rent"];
  const waterBill = fixedSettingsGlobal["Water Bill"];
  const lpSurchargeRate = fixedSettingsGlobal["L.P.Surcharge Rate"];
  const fpaRate = fixedSettingsGlobal["FPA Rate"];

  return {
    previousReadingPeak: Math.round(previousReadingPeak),
    previousReadingOffPeak: Math.round(previousReadingOffPeak),
    presentReadingPeak: Math.round(presentReadingPeak),
    presentReadingOffPeak: Math.round(presentReadingOffPeak),
    mfValue: Math.round(mfValue),
    costOfElectricity: Math.round(costOfElectricity),
    qtrTex: Math.round(qtrTex),
    gst: Math.round(gst),
    fuelPriceAdjustment: Math.round(fuelPriceAdjustment),
    fixedCharges: Math.round(fixedCharges),
    ptvFee: Math.round(ptvFee),
    meterRent: Math.round(meterRent),
    fcSurcharge: Math.round(fcSurcharge),
    waterBill: Math.round(waterBill),
    lpSurchargeRate: lpSurchargeRate.toFixed(4),
    fpaRate: fpaRate.toFixed(4),
  };
};

// ADD METER INFO CONTROLLER FUNCTION
const addMeterInfo = async (req, res) => {
  try {
    // REMAINING WORK
    // First of all there will be multiple meter info -- file

    // TARIFF SLABS VALUES
    residentailTariffValues = await Tariff.find();

    let tariffSlabs = {
      peak: 0,
      offPeak: 0,
    };

    // Iterate over the tariff values and update the tariffSlabs object
    residentailTariffValues.forEach((tariff) => {
      if (tariff.name === "peakValue") {
        tariffSlabs["peak"] = tariff.value;
      } else if (tariff.name === "offPeakValue") {
        tariffSlabs["offPeak"] = tariff.value;
      }
    });

    // FETCHING THE FIXED SETTING VALUES
    const fixedSettings = await FixedSetting.find();
    for (let i = 0; i < fixedSettings.length; i++) {
      fixedSettingsGlobal[fixedSettings[i].name] = fixedSettings[i].value;
    }

    // DESTRUCTURING THE METER INFO ARRAY
    const meterInfoArray = req.body;

    // console.log("meterInfoArray: ", meterInfoArray)

    // LOOPING OVER ALL THE METER INFOs (There will be a list of current readings of meter infos)
    for (let i = 0; i < meterInfoArray.length; i++) {
      // Destructuring Present Meter Info
      const userId = meterInfoArray[i].userId;
      const present_peak_reading = meterInfoArray[i].present_peak_reading;
      const present_off_peak_reading =
        meterInfoArray[i].present_off_peak_reading;

      // Variable to store Template Data Function Result
      let templateBillData = {};

      // Finding the previous meter info
      const previousMeterInfo = await UploadOnceBillData.findOne({
        userId: userId,
      });

      if (previousMeterInfo?.previousReadings?.length) {
        const previousReadingIndex =
          previousMeterInfo.previousReadings.length - 1;
        const previousPeakReading =
          previousMeterInfo.previousReadings[previousReadingIndex]
            .previous_peak;
        const previousOffPeakReading =
          previousMeterInfo.previousReadings[previousReadingIndex]
            .previous_off_peak;
        // Finding totalUnits value for FPA calculation :: (For August Required May Units)
        const tempIndex = previousMeterInfo.previousReadings.length;
        totalUnitsForFpaCalc =
          previousMeterInfo.previousReadings[tempIndex - 3].previous_peak -
          previousMeterInfo.previousReadings[tempIndex - 4].previous_peak +
          (previousMeterInfo.previousReadings[tempIndex - 3].previous_off_peak -
            previousMeterInfo.previousReadings[tempIndex - 4]
              .previous_off_peak);

        // Calling the function to calculate the template bill data
        templateBillData = await calculateTemplateBillData(
          previousPeakReading,
          previousOffPeakReading,
          present_peak_reading,
          present_off_peak_reading,
          totalUnitsForFpaCalc,
          tariffSlabs
        );
      } else {
        console.error("No previous readings found for the specified userId");
      }

      // Adding remaining fields to template bill data
      const userData = await UserInfo.find({ userId: userId });
      const remainingTemplateBillData = [
        { key: "userId", value: userData[0].userId },
        { key: "name", value: userData[0].name },
        { key: "location", value: userData[0].location },
        { key: "tariffCategory", value: userData[0].tariffCategory },
        { key: "phase", value: userData[0].phase },
        { key: "meterType", value: userData[0].meterType },
        { key: "tariffPeakValue", value: tariffSlabs["peak"] },
        { key: "tariffOffPeakValue", value: tariffSlabs["offPeak"] },
      ];

      remainingTemplateBillData.forEach((field) => {
        templateBillData[field.key] = field.value;
      });

      // Saving the Meter Info
      const meterInfo = new MeterInfo(meterInfoArray[i]);
      await meterInfo.save();

      // Saving the template bill data
      const billTemplateData = new TemplateBillData(templateBillData);
      await billTemplateData.save();

      // UPDATING THE ONCE UPLOAD ARRAY READINGS DATA WITH THE CURRENT READING. IT MEANS THAT PUSH THE CURRENT READING AT THE END OF THE ONCEUPLOADBILLDATA ARRAY.
      const previousReadingsArrayOfMeter = previousMeterInfo.previousReadings;
      // Remove the first entry
      previousReadingsArrayOfMeter.shift();
      // Add the new entry at the end
      previousReadingsArrayOfMeter.push({
        previous_peak: present_peak_reading,
        previous_off_peak: present_off_peak_reading,
      });
      // Update the document in the database
      await UploadOnceBillData.updateOne(
        { _id: previousMeterInfo._id }, // Match the document by ID or other criteria
        { $set: { previousReadings: previousReadingsArrayOfMeter } } // Update the array
      );
    }
    res.status(200).json({ message: "Meter info added successfully" });
  } catch (error) {
    console.log("Error adding meter info:", error);
    res.status(500).json({ message: "Failed to add meter info" });
  }
};

module.exports = {
  getAllMeterInfo,
  addMeterInfo,
};
