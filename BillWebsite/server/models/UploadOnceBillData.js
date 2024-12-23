const mongoose = require("mongoose");

const previousReadingSchema = new mongoose.Schema({
  previous_peak: {
    type: Number,
    required: true,
  },
  previous_off_peak: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  bill: {
    type: Number,
    required: true,
  },
});

const uploadOnceBillDataSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  previousReadings: {
    type: [previousReadingSchema],
    required: true,
    default: [],
  },
});

const UploadOnceBillData = mongoose.model(
  "UploadOnceBillData",
  uploadOnceBillDataSchema
);
module.exports = UploadOnceBillData;
