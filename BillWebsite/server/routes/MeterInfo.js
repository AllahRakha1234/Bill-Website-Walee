const express = require("express");
const {
    getAllMeterInfo,
    addMeterInfo
} = require("../controllers/MeterInfoController");

const router = express.Router();

// Add middleware to handle larger payloads
router.use(express.json({ limit: '10mb' }));

// Add basic request timeout middleware
const timeoutMiddleware = (req, res, next) => {
    res.setTimeout(25000, () => {
        res.status(408).json({ message: "Request timeout" });
    });
    next();
};

router.get("/", getAllMeterInfo);
router.post("/", timeoutMiddleware, addMeterInfo);

module.exports = router;