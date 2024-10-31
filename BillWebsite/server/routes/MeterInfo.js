const express = require("express");
const {
    getAllMeterInfo,
    addMeterInfo
} = require("../controllers/MeterInfoController");

const router = express.Router();

// Define routes and link them to controller functions
router.get("/", getAllMeterInfo);
router.post("/", addMeterInfo);

// Export the router
module.exports = router;
