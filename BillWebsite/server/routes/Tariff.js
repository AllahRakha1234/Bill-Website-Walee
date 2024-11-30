const express = require("express");
const router = express.Router();
const {
    getTariffSettings,
    updateTariffSettings,
} = require("../controllers/tariffController");

// Routes for tariffs
router.get("/", getTariffSettings);
router.put("/", updateTariffSettings);

module.exports = router;