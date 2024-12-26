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
      return res
        .status(400)
        .json({ message: "Input data must be a non-empty array of objects" });
    }

    for (const incomingData of incomingDataArray) {
      const { userId, previousReadings } = incomingData;

      if (!userId) {
        return res
          .status(400)
          .json({ message: "User ID is required for each object" });
      }

      if (!Array.isArray(previousReadings) || previousReadings.length === 0) {
        return res
          .status(400)
          .json({
            message: `Previous readings data is missing or invalid for userId ${userId}`,
          });
      }

      // Validate each reading in previousReadings
      for (const reading of previousReadings) {
        const { previous_peak, previous_off_peak, month, payment, bill } =
          reading;
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

    return res
      .status(200)
      .json({ message: "UploadOnceBillData processed successfully" });
  } catch (error) {
    console.log("Error adding or updating uploadOnceBillData:", error);
    res
      .status(500)
      .json({ message: "Failed to add or update uploadOnceBillData" });
  }
};

// Update current month data for a specific user
const updateCurrentMonthOnceBillData = async (req, res) => {
  try {
    const { userId, month, payment, bill, previous_peak, previous_off_peak } =
      req.body;

    // Validate input
    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Valid userId is required." });
    }
    if (!month || typeof month !== "string") {
      return res.status(400).json({ message: "Valid month is required." });
    }
    if (typeof payment !== "number" || typeof bill !== "number") {
      return res.status(400).json({
        message: "Valid payment and bill amounts are required.",
      });
    }

    // Find existing record by userId
    const existingData = await UploadOnceBillData.findOne({ userId });

    if (!existingData) {
      return res
        .status(404)
        .json({ message: `No data found for userId: ${userId}` });
    }

    // Check if the month already exists in previousReadings
    const existingReading = existingData.previousReadings.find(
      (reading) => reading.month === month
    );

    if (existingReading) {
      // Update the existing reading
      existingReading.payment = payment;
      existingReading.bill = bill;
      existingReading.previous_peak = previous_peak;
      existingReading.previous_off_peak = previous_off_peak;
    } else {
      // If the month is not found, add a new reading
      existingData.previousReadings.push({
        month,
        payment,
        bill,
        previous_peak,
        previous_off_peak,
      });
    }

    // Save the updated record
    await existingData.save();

    return res.status(200).json({
      message: "Data updated successfully",
      updatedData: existingData,
    });
  } catch (error) {
    console.error("Error updating current month data:", error);
    return res
      .status(500)
      .json({ message: "Failed to update current month data" });
  }
};

module.exports = {
  getAllUploadOnceBillData,
  addUploadOnceBillData,
  updateCurrentMonthOnceBillData,
};
