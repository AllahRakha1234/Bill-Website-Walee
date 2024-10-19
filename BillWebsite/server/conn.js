// Import mongoose to help establish a connection to MongoDB
const mongoose = require('mongoose');

// Define the MongoDB connection URL (replace with your own database URL)
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/NustBillWebsite';

// Function to connect to the database
const connectDB = async () => {
    try {
        // Mongoose connects to the MongoDB database
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1); // Exit the process with failure
    }
};

// Export the connection function to use in other parts of the application
module.exports = connectDB;
