// Import Mongoose
const mongoose = require('mongoose');

// Define the electricity bill schema for digital meters
const billSchema = new mongoose.Schema({

  // ABOVE ADDRESS SECTION FIELD :: (Dates, phase, tariff etc)
  userId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  tariffCategory: {
    type: String,
    required: true
  },
  phase: {
    type: Number,
    required: true
  },
  meterType: {
    type: String,
    required: true
  },
  // BELOW ADDRESS SECTION :: (UNITS PEAK AND OFFPEAK = PRESENT READING - PREVIOUS READING)
  previousReadingPeak: {
    type: Number,
    required: true,
  },
  previousReadingOffPeak: {
    type: Number,
    required: true,
  },
  presentReadingPeak: {
    type: Number,
    required: true,
  },
  presentReadingOffPeak: {
    type: Number,
    required: true,
  },
  mfValue: {
    type: Number,
    required: true,
  },
  // ELECTRICITY CHARGES SECTION :: (TOTAL = + OF ALL VALUES ABOVE EXCEPT TOTAL UNITS)
  costOfElectricity: {
    type: Number,
    required: true,
  },
  qtrTex: {
    type: Number,
    required: true,
  },
  gst: {
    type: Number,
    required: true,
  },
  fuelPriceAdjustment: {
    type: Number,
    required: true,
  },
  fixedCharges: {
    type: Number,
    required: true,
  },
  // GOVT CHARGES SECTION :: (TOTAL = + OF ALL VALUES ABOVE)
  ptvFee: {
    type: Number,
    required: true,
  },
  meterRent: {
    type: Number,
    required: true,
  },
  fcSurcharge: {
    type: Number,
    required: true,
  },
  // ARREARS SECTION :: (CURRENT BILL = ELECT CHARGES TOTAL + GOVT CHARGES TOTAL) (PAYABLEWITHIN DUE DATE = CURRENT BILL + WATER BILL) (PAYABLEAFTER DUE DATE = PAYABLEWITHIN DUE DATE + LPSURCHARGE)
  waterBill: {
    type: Number,
    required: true,
  },
  lpSurchargeRate: {
    type: Number,
    required: true,
  },
  fpaRate:{
    type: Number,
    required: true,
  },
  // TARIFF VALUES SECTION :: (RS kWh)
  tariffPeakValue:{
    type: Number,
    required: true,
  },
  tariffOffPeakValue:{
    type: Number,
    required: true,
  },
  // DATE SECTION :: (DATE OF BILLING, DUE DATE, ETC.)
  billMonthDate: {
    type: String,
    required: true,
  },
  billDueDate: {
    type: String,
    required: true,
  },
  billDurationStartDate: {
    type: String,
    required: true,
  },
  billDurationEndDate: {
    type: String,
    required: true,
  },
  billFPADate: {
    type: String,
    required: true,
  },
  // FIELDS LIKE MONTH, UNITS, BILL, PAYMENTS FOR LAST 12 MONTHS
  months: {
    type: [String],  // Array of month-year strings (e.g., 'Jan-2024', 'Feb-2024', etc.)
    required: true,
    default: [],
  },
  units: {
    type: [Number],  // Array of units for each month (difference between present and previous readings)
    required: true,
    default: [],
  },
  payments: {
    type: [Number],  // Array of payment amounts for each month
    required: true,
    default: [],
  },
  bills: {
    type: [Number],  // Array of bill amounts for each month
    required: true,
    default: [],
  },
});

// Create the electricity bill model
const TemplateBillData = mongoose.model('TemplateBillData', billSchema);

// Export the model
module.exports = TemplateBillData;
