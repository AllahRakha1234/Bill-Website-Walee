const express = require("express");
const {
    getAllUploadOnceBillData,
    addUploadOnceBillData
} = require("../controllers/UploadOnceBillDataController");

const router = express.Router();

// Define routes and link them to controller functions
router.get("/", getAllUploadOnceBillData);
router.post("/", addUploadOnceBillData);

// Export the router
module.exports = router;
