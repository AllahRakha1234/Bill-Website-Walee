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
  meterId,
  previousPeakReading,
  previousOffPeakReading,
  present_peak_reading,
  present_off_peak_reading,
  tariffSlabs
) => {
  const meterNo = meterId;
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
  const costOfElectricity = await calculateElectricCost(peakUnits, offPeakUnits, tariffSlabs);
  const qtrTex = await calculateQtrTex(totalUnits, fixedSettingsGlobal["QTR Rate"]);
  const fcSurcharge = await calculateFC(totalUnits, fixedSettingsGlobal["FC Rate"]); 
  const gst = await calculateGST(costOfElectricity, fcSurcharge, qtrTex); 
  const fuelPriceAdjustment = await calculateFPA(totalUnits, fixedSettingsGlobal["FPA Rate"], fixedSettingsGlobal["edOnFpa Rate"], fixedSettingsGlobal["gstOnFpa Rate"]);
  const fixedCharges = fixedSettingsGlobal["Fixed Charges"];
  const ptvFee = fixedSettingsGlobal["TV Fee"];
  const meterRent = fixedSettingsGlobal["Meter Rent"];
  const waterBill = fixedSettingsGlobal["Water Bill"];
  const lpSurcharge = 0; // HARDCODED VALUE
  const fpaRate = fixedSettingsGlobal["FPA Rate"];

  return {
    meterNo,
    previousReadingPeak,
    previousReadingOffPeak,
    presentReadingPeak,
    presentReadingOffPeak,
    mfValue,
    costOfElectricity,
    qtrTex,
    gst,
    fuelPriceAdjustment,
    fixedCharges,
    ptvFee,
    meterRent,
    fcSurcharge,
    waterBill,
    lpSurcharge,
    fpaRate
};

};

// ADD METER INFO CONTROLLER FUNCTION
const addMeterInfo = async (req, res) => {
  try {
    // REMAINING WORK
    // First of all there will be multiple meter info -- file
    // Second thing is to populate the template bill data for user bill downloading

    // TARIFF SLABS VALUES (FOR NOW HARDCODED)
    const tariffSlabs = {
      peak: 48.0,
      offPeak: 41.68,
    };

    // FETCHING THE FIXED SETTING VALUES
    const fixedSettings = await FixedSetting.find();
    for (let i = 0; i < fixedSettings.length; i++) {
      fixedSettingsGlobal[fixedSettings[i].name] = fixedSettings[i].value;
    }
    // console.log("fixed settings:", fixedSettingsGlobal);

    // DESTRUCTURING THE METER INFO ARRAY
    const meterInfoArray = req.body;

    // LOOPING OVER ALL THE METER INFOs
    for (let i = 0; i < meterInfoArray.length; i++) {
      // Destructuring Present Meter Info
      const meterId = meterInfoArray[i].meterId;
      const present_peak_reading = meterInfoArray[i].present_peak_reading;
      const present_off_peak_reading =
        meterInfoArray[i].present_off_peak_reading;

      // Finding the previous meter info
      const previousMeterInfo = await UploadOnceBillData.findOne({
        meterId: meterId,
      });
      if (previousMeterInfo?.previousReadings?.length) {
        const previousReadingIndex =
          previousMeterInfo.previousReadings.length - 1;
        previousPeakReading =
          previousMeterInfo.previousReadings[previousReadingIndex]
            .previous_peak;
        previousOffPeakReading =
          previousMeterInfo.previousReadings[previousReadingIndex]
            .previous_off_peak;
      } else {
        console.error("No previous readings found for the specified meterId");
      }

      // Calling the function to calculate the template bill data
      const templateBillData = await calculateTemplateBillData(
        meterId,
        previousPeakReading,
        previousOffPeakReading,
        present_peak_reading,
        present_off_peak_reading,
        tariffSlabs
      );

      // Saving the Meter Info
      const meterInfo = new MeterInfo(meterInfoArray[i]);
      await meterInfo.save();

      // Saving the template bill data
      const billTemplateData = new TemplateBillData(templateBillData);
      await billTemplateData.save();
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
