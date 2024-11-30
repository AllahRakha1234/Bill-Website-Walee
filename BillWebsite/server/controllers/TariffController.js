const Tariff = require("../models/Tariff");

// Fetch or initialize tariff values
const getTariffSettings = async (req, res) => {
  try {
    const tariffs = await Tariff.find();

    if (tariffs.length === 0) {
      // Initialize default tariff settings in DB if they don't exist
      const defaultTariffs = [
        { name: "peakValue", value: 48 },
        { name: "offPeakValue", value: 41.68 },
      ];

      // Insert default tariff settings into the database
      await Tariff.insertMany(defaultTariffs);
      return res.status(200).json({
        residentailTariffValues: defaultTariffs,
      });
    }

    res.status(200).json({ residentailTariffValues: tariffs });
  } catch (error) {
    console.error("Error fetching tariffs:", error);
    res.status(500).json({ message: "Failed to fetch tariffs." });
  }
};

// Update tariff settings
const updateTariffSettings = async (req, res) => {
  try {
    const residentailTariffValues = req.body.residentailTariffValues;
    console.log("residentailTariffValues: ", residentailTariffValues);
    // Loop through each setting and update in the database
    for (let tariff of residentailTariffValues) {
      await Tariff.findOneAndUpdate(
        { name: tariff.name },
        { value: tariff.value },
        { new: true, upsert: true } // upsert will create a new document if it doesn’t exist
      );
    }

    res.status(200).json({ message: "Tariff Values updated successfully" });
  } catch (error) {
    console.error("Error updating tariff:", error);
    res.status(500).json({ message: "Failed to update tariff." });
  }
};

module.exports = {
  getTariffSettings,
  updateTariffSettings,
};
