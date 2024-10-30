const mongoose = require('mongoose');


const MeterInfoSchema = new mongoose.Schema({
    meterId: {type: Number, required: true},
    current_peak_reading: {type: Number, required: true},
    current_off_peak_reading: {type: Number, required: true},
});

const MeterInfo = mongoose.model('MeterInfo', MeterInfoSchema);
module.exports = MeterInfo;