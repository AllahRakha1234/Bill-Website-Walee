// Importing required modules
const express = require('express');
const connectDB = require('./conn'); // Import the MongoDB connection function
require('dotenv').config(); // Load environment variables
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

// Import routes
const fixedSettingsRoute = require("./routes/FixedSettings");

// Define routes
app.use("/api/fixed-settings", fixedSettingsRoute); // Fixed settings routes

// Defining a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! Connected to MongoDB');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
