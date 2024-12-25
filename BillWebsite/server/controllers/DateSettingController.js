const DateSetting = require("../models/DateSetting"); // Import the DateSetting model

// Get the current date settings
const getDateSetting = async (req, res) => {
  try {
    // Check if the settings exist in the database
    let dateSetting = await DateSetting.findOne();
    // If no settings exist, return the initial default values
    if (!dateSetting) {
      dateSetting = new DateSetting({
        dateSettings: [
          { key: "billMonthDate", value: "Aug-2024" },
          { key: "billDueDate", value: "12-08-2024" },
          { key: "billDurationStartDate", value: "02-07-2024" },
          { key: "billDurationEndDate", value: "02-08-2024" },
          { key: "billFPADate", value: "Jun-2024" },
        ],
      });

      // Save the default values to the database for future use
      await dateSetting.save();
    }

    res.status(200).json(dateSetting);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving date settings", error });
  }
};

// Update the date settings
const updateDateSetting = async (req, res) => {
  const { dateSettings } = req.body; // Correctly destructure `dateSettings` from the request body

  // console.log("dateSettings inside update function: ", dateSettings); // To check the incoming data

  try {
    // Find the existing date settings
    let dateSetting = await DateSetting.findOne();

    if (!dateSetting) {
      // If no settings exist, create a new record
      dateSetting = new DateSetting({ dateSettings });
    } else {
      // Update the existing settings
      dateSetting.dateSettings = dateSettings;
    }

    // Save the updated settings
    await dateSetting.save();
    res
      .status(200)
      .json({ message: "Date settings updated successfully", dateSetting });
  } catch (error) {
    res.status(500).json({ message: "Error updating date settings", error });
  }
};

module.exports = {
  getDateSetting,
  updateDateSetting,
};
