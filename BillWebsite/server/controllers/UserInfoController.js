const UserInfo = require("../models/UserInfo");

// Get all user information
const getAllUserInfo = async (req, res) => {
  try {
    const userInfo = await UserInfo.find();
    res.status(200).json({ userInfo });
  } catch (error) {
    console.log("Error fetching user info:", error);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};

// Add or update user information from a file
const addUserInfo = async (req, res) => {
  try {
    const userInfoArray = req.body; // Assuming the uploaded file is parsed into an array of user objects
    // Validate input format
    if (!Array.isArray(userInfoArray)) {
      return res
        .status(400)
        .json({
          message: "Invalid input format. Expected an array of user objects.",
        });
    }

    // Process each user in the uploaded file
    for (const newUserInfo of userInfoArray) {
      // Check if a user with the given userId already exists
      const existingUser = await UserInfo.findOne({
        userId: newUserInfo.userId,
      });

      if (existingUser) {
        // If user exists, update the information
        await UserInfo.findOneAndUpdate(
          { userId: newUserInfo.userId }, // Match userId
          newUserInfo, // Update with new data
          { new: true } // Return the updated document
        );
      } else {
        // If user does not exist, create a new entry
        const userInfo = new UserInfo(newUserInfo);
        await userInfo.save();
      }
    }

    res.status(200).json({ message: "User info processed successfully." });
  } catch (error) {
    console.log("Error processing user info:", error);
    res.status(500).json({ message: "Failed to process user info." });
  }
};

module.exports = {
  getAllUserInfo,
  addUserInfo,
};
