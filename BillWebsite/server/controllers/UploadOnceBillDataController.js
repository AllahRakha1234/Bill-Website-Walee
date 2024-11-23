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
        const incomingDataArray = req.body; // Assume req.body is an array of objects

        if (!Array.isArray(incomingDataArray) || incomingDataArray.length === 0) {
            return res.status(400).json({ message: "Input data must be a non-empty array of objects" });
        }

        for (const incomingData of incomingDataArray) {
            const { meterId, ...readings } = incomingData;

            if (!meterId) {
                return res.status(400).json({ message: "Meter ID is required for each object" });
            }

            // Transform flat readings into the schema's `previousReadings` array format
            const previousReadings = [];
            for (let i = 1; i <= 12; i++) {
                if (readings[`previous_peak_${i}`] !== undefined && readings[`previous_off_peak_${i}`] !== undefined) {
                    previousReadings.push({
                        previous_peak: readings[`previous_peak_${i}`],
                        previous_off_peak: readings[`previous_off_peak_${i}`],
                    });
                }
            }

            if (previousReadings.length === 0) {
                return res.status(400).json({ message: `Previous readings data is missing or invalid for meterId ${meterId}` });
            }

            // Construct the formatted data
            const formattedData = {
                meterId,
                previousReadings,
            };

            // Check if the record with the given meterId exists
            const existingData = await UploadOnceBillData.findOne({ meterId });

            if (existingData) {
                // Update existing record
                await UploadOnceBillData.updateOne({ meterId }, { $set: formattedData });
            } else {
                // Insert a new record
                const uploadOnceBillData = new UploadOnceBillData(formattedData);
                await uploadOnceBillData.save();
            }
        }

        return res.status(200).json({ message: "UploadOnceBillData processed successfully" });
    } catch (error) {
        console.log("Error adding or updating uploadOnceBillData:", error);
        res.status(500).json({ message: "Failed to add or update uploadOnceBillData" });
    }
};



module.exports = {
    getAllUploadOnceBillData,
    addUploadOnceBillData
};
