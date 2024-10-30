
const mongoose = require("mongoose");


const userInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    meterId: {
        type: Number,
        required: true
    }

})

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;