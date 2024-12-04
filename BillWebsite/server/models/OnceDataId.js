const mongoose = require("mongoose");

const OnceDataIdSchema = new mongoose.Schema({
  monthYearId: {
    type: String,
    required: true,
  },
});

onceDataId = mongoose.model("OnceDataId", OnceDataIdSchema);

module.exports = onceDataId;
