const mongoose = require("mongoose");
const express = require("express");
const MeterInfo = require("../models/MeterInfo"); // Import the MeterInfo model

// Defining a router
const router = express.Router();


// Route to fetch all meter info
router.get("/", async(req, res)=>{
    try {
        const meterInfo = await MeterInfo.find();
        res.status(200).json({meterInfo});
    } catch (error) {
        console.log("Error fetching meter info:", error);
        res.status(500).json({message: "Failed to fetch meter info"});
    }
})

// Route to add meter info
router.post("/", async(req, res)=>{
    try {
        const newMeterInfo = req.body;
        const meterInfo = new MeterInfo(newMeterInfo);
        await meterInfo.save();
        res.status(200).json({message: "Meter info added successfully"});
    } catch (error) {
        console.log("Error adding meter info:", error);
        res.status(500).json({message: "Failed to add meter info"});
    }
})




// Export the router
module.exports = router;