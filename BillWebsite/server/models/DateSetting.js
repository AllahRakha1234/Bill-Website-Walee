const mongoose = require("mongoose");

const DateSettingSchema = new mongoose.Schema({
  dateSettings: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("DateSetting", DateSettingSchema);
