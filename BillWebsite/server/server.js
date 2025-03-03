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
const adminLogin = require("./routes/AdminLogin");
const verifyToken = require("./routes/VerifyToken");

const app = express();

// Allow requests from the frontend
app.use(cors({
  origin: ["http://localhost:3000", "https://bill-website-walee.vercel.app/"] // Include frontend's Vercel domain
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Defining a port
const PORT = process.env.PORT || 3001;

// Connect to MongoDB before starting the server
connectDB();

// Define routes
app.use("/api/fixed-settings", fixedSettingsRoute); 
app.use("/api/meter-info", meterInfoRoute); 
app.use("/api/user-info", userInfoRoute); 
app.use("/api/upload-once-bill-data", uploadOnceBillData); 
app.use("/api/get-bill-template-data", templateBillData); 
app.use("/api/resid-tariff-values", tariff); 
app.use("/api/date-setting", dateSetting); 
app.use("/api/admin-login", adminLogin); 
app.use("/api/verify-token", verifyToken); 

// Defining a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! Connected to MongoDB');
});

console.log("INside Server")

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
