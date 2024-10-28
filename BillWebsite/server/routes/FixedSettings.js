// routes/fixedSettings.js

const express = require("express");
const router = express.Router();
const FixedSetting = require("../models/FixedSetting");

// Route to fetch or initialize fixed settings
router.get("/", async (req, res) => {
  try {
    const settings = await FixedSetting.find();

    if (settings.length === 0) {
      // Initialize default settings in DB if they don't exist
      const defaultSettings = [
        { name: "TV Fee", value: 35 },
        { name: "Meter Rent", value: 25 },
        { name: "Water Bill", value: 250 },
        { name: "Fixed Charges", value: 1000 },
        { name: "FPA Rate", value: 0.43 },
        { name: "FC Rate", value: 0.43 },
        { name: "ED", value: 0 },
        { name: "NJ", value: 0 },
      ];

      // Insert default settings into the database
      await FixedSetting.insertMany(defaultSettings);
      return res.status(200).json({ settings: defaultSettings });
    }

    res.status(200).json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Failed to fetch settings." });
  }
});

// Route to update fixed settings
router.put("/", async (req, res) => {
  try {
    const settings = req.body.settings; // Array of settings to update

    // Loop through each setting and update in the database
    for (let setting of settings) {
      await FixedSetting.findOneAndUpdate(
        { name: setting.name },
        { value: setting.value },
        { new: true, upsert: true } // upsert will create a new document if it doesn’t exist
      );
    }

    res.status(200).json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ message: "Failed to update settings" });
  }
});

module.exports = router;
