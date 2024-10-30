
const express = require("express");

const UserInfo = require("../models/UserInfo");


const router = express.Router();

router.get("/", async(req, res)=>{
    try {
        const userInfo = await UserInfo.find();
        res.status(200).json({userInfo});
    } catch (error) {
        console.log("Error fetching user info:", error);
        res.status(500).json({message: "Failed to fetch user info"});
    }
});

router.post("/", async(req, res)=>{
    try {
        const newUserInfo = req.body;
        const userInfo = new UserInfo(newUserInfo);
        await userInfo.save();
        res.status(200).json({message: "User info added successfully"});
    } catch (error) {
        console.log("Error adding user info:", error);
        res.status(500).json({message: "Failed to add user info"});
    }
})

module.exports = router;