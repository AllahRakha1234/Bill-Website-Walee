const TemplateBillData = require("../models/TemplateBillData");

// Get all template bill data
const getTemplateBillData = async (req, res) => {
  try {
    const userId = req.params.referenceNo; // Use req.params to get referenceNo(userId) from route
    const templateBillData = await TemplateBillData.find({ userId: userId });
    // console.log("templateBillData:", templateBillData);
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