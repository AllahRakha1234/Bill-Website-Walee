
const express = require("express");

const { getTemplateBillData } = require("../controllers/TemplateBillDataController");

const router = express.Router();

// Define routes and link them to controller functions
router.get("/:meterId", getTemplateBillData);


module.exports = router;