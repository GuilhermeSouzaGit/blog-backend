const mongoose = require("../db/conn")
const { Schema } = mongoose

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comments: [{
        text: {
            type: String,
            required: true
        },
        postedBy: {
            type: String
        },
        userId: {
            type: String,
        }
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })

const Posts = mongoose.model("Posts", PostSchema)

module.exports = Posts
