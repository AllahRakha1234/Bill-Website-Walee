// Import Mongoose
const mongoose = require('mongoose');

// Define the electricity bill schema for digital meters
const billSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  meterNumber: {
    type: Number,
    required: true,
  },
  previousReadingPeak: {
    type: Number,
    required: true,
  },
  currentReadingPeak: {
    type: Number,
    required: true,
  },
  unitsPeak: {
    type: Number,
    required: true,
  },
  previousReadingOffPeak: {
    type: Number,
    required: true,
  },
  currentReadingOffPeak: {
    type: Number,
    required: true,
  },
  unitsOffPeak: {
    type: Number,
    required: true,
  },
  electricCost: {
    type: Number,
    required: true,
  },
  fixedCharges: {
    type: Number,
    required: true,
  },
  fcSurcharge: {
    type: Number,
    required: true,
  },
  gst: {
    type: Number,
    required: true,
  },
  tvFee: {
    type: Number,
    required: true,
  },
  meterRent: {
    type: Number,
    required: true,
  },
  fpa: {
    type: Number,
    required: true,
  },
  qtrTax: {
    type: Number,
    required: true,
  },
  waterBill: {
    type: Number,
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
    required: false,
  },
});

// Create the electricity bill model
const TemplateBillData = mongoose.model('TemplateBillData', billSchema);

// Export the model
module.exports = TemplateBillData;
