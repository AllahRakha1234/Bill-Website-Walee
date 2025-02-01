const express = require("express");
const { verifyToken } = require("../controllers/VerifyTokenController");
const router = express.Router();

// Route to verify the token
router.post("/", verifyToken);

module.exports = router;
