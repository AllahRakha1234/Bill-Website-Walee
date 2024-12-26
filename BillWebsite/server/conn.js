const mongoose = require('mongoose');
require('dotenv').config(); 

const MONGO_URL = process.env.MONGO_URL;

let isConnected = false; // Track whether MongoDB is connected

const connectDB = async () => {
  try {
    // Only connect if not connected
    if (isConnected) {
      console.log('Already connected to MongoDB');
      return;
    }
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
