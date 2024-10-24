const mongoose = require('mongoose');

// Define the Tariff Commercial Schema
const tariffCommercialSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: true,
  },
  tariffCategory: {
    type: String,
    required: true,
  },
  fixedCharges: {
    type: Map, // To handle multiple values (e.g., kW or kWh)
    of: Number,
    required: false, // Some entries don't have fixed charges
  },
  variableCharges: {
    peak: {
      type: Number,
      required: true,
    },
    offPeak: {
      type: Number,
      required: true,
    },
  },
  trSurcharge: {
    peak: {
      type: Number,
      required: true,
    },
    offPeak: {
      type: Number,
      required: true,
    },
  },
  timeOfUse: {
    peak: {
      type: Number,
      required: true,
    },
    offPeak: {
      type: Number,
      required: true,
    },
  },
  sanctionedLoad: {
    forUpTo50Units: {
      type: Number,
      required: false,
    },
    forUpTo100Units: {
      type: Number,
      required: false,
    },
    forAbove100Units: {
      type: Number,
      required: false,
    },
    forAbove500Units: {
      type: Number,
      required: false,
    },
  },
  minimumMonthlyCharges: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
    required: false,
  },
}, { timestamps: true });

// Create the Tariff Commercial model
const TariffCommercial = mongoose.model('TariffCommercial', tariffCommercialSchema);

// Export the model
module.exports = TariffCommercial;
