const mongoose = require("../db/conn")
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    }]
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

module.exports = User