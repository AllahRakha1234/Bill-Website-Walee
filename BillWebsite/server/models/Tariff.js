const mongoose = require("mongoose");

const TariffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Tariff = mongoose.model("Tariff", TariffSchema);

module.exports = Tariff;