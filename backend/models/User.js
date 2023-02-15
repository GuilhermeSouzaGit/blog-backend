const mongoose = require("../db/conn")
const {Schema} = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        default: 0
    },
},{timestamps: true})

const User = mongoose.model("User",  UserSchema)

module.exports = User