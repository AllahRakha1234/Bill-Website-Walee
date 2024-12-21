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
            const { userId, previousReadings } = incomingData;

            if (!userId) {
                return res.status(400).json({ message: "User ID is required for each object" });
            }

            if (!Array.isArray(previousReadings) || previousReadings.length === 0) {
                return res.status(400).json({ message: `Previous readings data is missing or invalid for userId ${userId}` });
            }

            // Validate each reading in previousReadings
            for (const reading of previousReadings) {
                const { previous_peak, previous_off_peak, month, payment, bill } = reading;
                if (
                    typeof previous_peak !== "number" ||
                    typeof previous_off_peak !== "number" ||
                    typeof payment !== "number" ||
                    typeof bill !== "number" ||
                    typeof month !== "string"
                ) {
                    return res.status(400).json({
                        message: `Invalid data format in previousReadings for userId ${userId}. All fields are required and must have the correct data type.`,
                    });
                }
            }

            // Construct the formatted data
            const formattedData = {
                userId,
                previousReadings,
            };

            // Check if the record with the given userId exists
            const existingData = await UploadOnceBillData.findOne({ userId });

            if (existingData) {
                // Update existing record
                await UploadOnceBillData.updateOne({ userId }, { $set: formattedData });
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
