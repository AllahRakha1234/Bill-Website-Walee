const express = require("express");
const { getAllUserInfo, addUserInfo } = require("../controllers/UserInfoController");

const router = express.Router();

// Define routes and link them to controller functions
router.get("/", getAllUserInfo);
router.post("/", addUserInfo);
//hello world
module.exports = router;
