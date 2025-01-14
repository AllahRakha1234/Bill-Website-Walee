// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminLogin = require("../models/AdminLogin");

// Secret Key
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// Register a new user (Signup)
const signUp = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await AdminLogin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create a new user without manually hashing the password
      const newUser = new AdminLogin({ email, password });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  
// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await AdminLogin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use the comparePassword method from the model
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Change Password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await AdminLogin.findById(req.user.id); // Assuming req.user is populated via middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Save the updated user
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { signUp, login, changePassword };
