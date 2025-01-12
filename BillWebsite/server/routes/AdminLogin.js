// routes/authRoutes.js
const express = require('express');
const { signUp, login, changePassword } = require('../controllers/AdminLoginController');
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();

// Route to register a new user (Sign Up)
router.post('/signup', signUp);

// Route for user login
router.post('/login', login);

// Route for changing password
router.patch('/change-password',authMiddleware , changePassword);

module.exports = router;
