const mongoose = require("../db/conn")
const {Schema} = mongoose

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    likesCount: { type: Number, default: 0 },
},{timestamps: true})

const Posts = mongoose.model("Posts", PostSchema)

module.exports = Posts