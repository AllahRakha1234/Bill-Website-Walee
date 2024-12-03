const express = require("express");
const {
    getDateSetting,
    updateDateSetting
} = require("../controllers/DateSettingController");

const router = express.Router();

// Define routes and link them to controller functions
router.get("/", getDateSetting);
router.put("/", updateDateSetting);

// Export the router
module.exports = router;
