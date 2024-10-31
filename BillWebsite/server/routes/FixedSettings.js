const express = require("express");
const {
    getFixedSettings,
    updateFixedSettings
} = require("../controllers/FixedSettingsController");

const router = express.Router();

// Define routes and link them to controller functions
router.get("/", getFixedSettings);
router.put("/", updateFixedSettings);

// Export the router
module.exports = router;
