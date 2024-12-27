const TemplateBillData = require("../models/TemplateBillData");

// Get all template bill data
// Get all template bill data
const getTemplateBillData = async (req, res) => {
  try {
    const userId = req.params.referenceNo; // Use req.params to get referenceNo(userId) from route

    const templateBillData = await TemplateBillData.find({ userId: userId });

    if (templateBillData && templateBillData.length > 0) {
      res.status(200).json(templateBillData);
    } else {
      res.status(404).json({ message: "No template bill data found for the given userId." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTemplateBillData,
};
