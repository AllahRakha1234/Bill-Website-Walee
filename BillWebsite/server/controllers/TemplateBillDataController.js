const TemplateBillData = require("../models/TemplateBillData");

// Get all template bill data
const getTemplateBillData = async (req, res) => {
  try {
    const meterId = req.body.meterId;
    const templateBillData = await TemplateBillData.find({ meterId: meterId });
    res.status(200).json(templateBillData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTemplateBillData,
};

// Adding a new template bill data to db

const addTemplateBillData = async (req, res) => {
  
};