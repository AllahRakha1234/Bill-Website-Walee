// Importing required modules
const express = require('express');
const connectDB = require('./conn'); // Import the MongoDB connection function
require('dotenv').config(); // Add this line to load .env variables
const FixedSetting = require('./models/FixedSetting'); // Import the FixedSetting model
const cors = require("cors");

const app = express();

// Allow requests from the frontend
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse JSON bodies
app.use(express.json());

// Defining a port
const PORT = process.env.PORT || 3001;

// Connect to MongoDB before starting the server
connectDB();

// Defining a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! Connected to MongoDB');
});

app.get("/api/fixed-settings", async (req, res) => {
  try {
    const settings = await FixedSetting.find(); // Assuming a Mongoose model named FixedSettingModel

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

// API endpoint to update fixed settings
app.put("/api/fixed-settings", async (req, res) => {
  try {
    const settings = req.body.settings; // Array of settings to update
    console.log("Inside fixed setting:", settings)

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

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
