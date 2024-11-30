
const mongoose = require("mongoose");


const userInfoSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tariffCategory: {
        type: String,
        required: true
    },
    phase: {
        type: Number,
        required: true
    },
    meterType: {
        type: String,
        required: true
    }
})

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;