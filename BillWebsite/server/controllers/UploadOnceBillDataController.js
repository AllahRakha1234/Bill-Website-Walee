const UploadOnceBillData = require("../models/UploadOnceBillData");

// Fetch all uploadOnceBillData
const getAllUploadOnceBillData = async (req, res) => {
    try {
        const uploadOnceBillData = await UploadOnceBillData.find();
        res.status(200).json({ uploadOnceBillData });
    } catch (error) {
        console.log("Error fetching uploadOnceBillData:", error);
        res.status(500).json({ message: "Failed to fetch uploadOnceBillData" });
    }
};

// Add new uploadOnceBillData
const addUploadOnceBillData = async (req, res) => {
    try {
        const newUploadOnceBillData = req.body;
        const uploadOnceBillData = new UploadOnceBillData(newUploadOnceBillData);
        await uploadOnceBillData.save();
        res.status(200).json({ message: "UploadOnceBillData added successfully" });
    } catch (error) {
        console.log("Error adding uploadOnceBillData:", error);
        res.status(500).json({ message: "Failed to add uploadOnceBillData" });
    }
};

module.exports = {
    getAllUploadOnceBillData,
    addUploadOnceBillData
};
