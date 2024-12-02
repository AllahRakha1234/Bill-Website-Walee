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

// Add new user information
// Add or update user information
const addUserInfo = async (req, res) => {
    try {
        const newUserInfo = req.body;

        // Check if a user with the given userId already exists
        const existingUser = await UserInfo.findOne({ userId: newUserInfo.userId });

        if (existingUser) {
            // If user exists, update the information
            await UserInfo.findOneAndUpdate(
                { userId: newUserInfo.userId }, // Match userId
                newUserInfo,                   // Update with new data
                { new: true }                  // Return the updated document
            );
            res.status(200).json({ message: "User info updated successfully" });
        } else {
            // If user does not exist, create a new entry
            const userInfo = new UserInfo(newUserInfo);
            await userInfo.save();
            res.status(200).json({ message: "User info added successfully" });
        }
    } catch (error) {
        console.log("Error adding/updating user info:", error);
        res.status(500).json({ message: "Failed to add or update user info" });
    }
};


module.exports = {
    getAllUserInfo,
    addUserInfo
};
