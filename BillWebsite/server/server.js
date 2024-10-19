// Importing required modules
const express = require('express');
const connectDB = require('./conn'); // Import the MongoDB connection function

const app = express();

// Defining a port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB before starting the server
connectDB();

// Defining a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! Connected to MongoDB');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
