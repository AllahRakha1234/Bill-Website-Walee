const TemplateBillData = require("../models/TemplateBillData");

// Get all template bill data
const getTemplateBillData = async (req, res) => {
  try {
    const meterId = req.params.meterId; // Use req.params to get meterId from route
    // console.log("meterId:", meterId);
    const templateBillData = await TemplateBillData.find({ meterNo: meterId });
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