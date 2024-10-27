const mongoose = require("mongoose");

const fixedSettingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const FixedSettingModel = mongoose.model("FixedSetting", fixedSettingSchema);

module.exports = FixedSettingModel;
