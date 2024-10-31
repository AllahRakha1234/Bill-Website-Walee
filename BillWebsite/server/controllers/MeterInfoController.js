const MeterInfo = require("../models/MeterInfo");

// Fetch all meter info
const getAllMeterInfo = async (req, res) => {
    try {
        const meterInfo = await MeterInfo.find();
        res.status(200).json({ meterInfo });
    } catch (error) {
        console.log("Error fetching meter info:", error);
        res.status(500).json({ message: "Failed to fetch meter info" });
    }
};

// Add new meter info
const addMeterInfo = async (req, res) => {
    try {
        // REMAINING WORK
        // First of all there will be multiple meter info -- file
        // Second thing is to populate the template bill data for user bill downloading
        const newMeterInfo = req.body;
        const meterInfo = new MeterInfo(newMeterInfo);
        await meterInfo.save();
        res.status(200).json({ message: "Meter info added successfully" });
    } catch (error) {
        console.log("Error adding meter info:", error);
        res.status(500).json({ message: "Failed to add meter info" });
    }
};

module.exports = {
    getAllMeterInfo,
    addMeterInfo
};
