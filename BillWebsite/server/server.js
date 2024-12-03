// Importing required modules
const express = require('express');
const connectDB = require('./conn'); // Import the MongoDB connection function
require('dotenv').config(); // Load environment variables
const cors = require("cors");
// Import routes
const fixedSettingsRoute = require("./routes/FixedSettings");
const meterInfoRoute = require("./routes/MeterInfo");
const userInfoRoute = require("./routes/UserInfo");
const uploadOnceBillData = require("./routes/UploadOnceBillData");
const templateBillData = require("./routes/TemplateBillData");
const tariff = require("./routes/Tariff");
const dateSetting = require("./routes/DateSetting");

const app = express();

// Allow requests from the frontend
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse JSON bodies
app.use(express.json());

// Defining a port
const PORT = process.env.PORT || 3001;

// Connect to MongoDB before starting the server
connectDB();

// Define routes
app.use("/api/fixed-settings", fixedSettingsRoute); // Fixed settings routes
app.use("/api/meter-info", meterInfoRoute); // Meter info routes
app.use("/api/user-info", userInfoRoute); // User info routes
app.use("/api/upload-once-bill-data", uploadOnceBillData); // Upload Once data routes
app.use("/api/get-bill-template-data", templateBillData); // Bill Template routes
app.use("/api/resid-tariff-values", tariff); // Tariff routes
app.use("/api/date-setting", dateSetting); // Date setting routes

// Defining a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! Connected to MongoDB');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
