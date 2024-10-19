// Import mongoose to help establish a connection to MongoDB
const mongoose = require('mongoose');
require('dotenv').config(); 

// Define the MongoDB connection URL (replace with your own database URL)
const MONGO_URL = process.env.MONGO_URL;

console.log("URL: ", MONGO_URL)

// Function to connect to the database
const connectDB = async () => {
    try {
        // Mongoose connects to the MongoDB database
        await mongoose.connect(MONGO_URL);
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1); // Exit the process with failure
    }
};

// Export the connection function to use in other parts of the application
module.exports = connectDB;
