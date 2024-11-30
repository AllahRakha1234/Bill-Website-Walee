const mongoose = require('mongoose');


const MeterInfoSchema = new mongoose.Schema({
    userId: {type: Number, required: true},
    present_peak_reading: {type: Number, required: true},
    present_off_peak_reading: {type: Number, required: true},
});

const MeterInfo = mongoose.model('MeterInfo', MeterInfoSchema);
module.exports = MeterInfo;