// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for Fixed Settings related to electricity bills
const fixedSettingSchema = new mongoose.Schema({
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
  remarks: {
    type: String,
    required: false,
  },
  effectiveDate: {
    type: Date,
    required: true,
  },
});

// Create the model for Fixed Settings
const FixedSetting = mongoose.model('FixedSetting', fixedSettingSchema);

// Export the model
module.exports = FixedSetting;
