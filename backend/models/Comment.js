const mongoose = require("../db/conn")
const {Schema} = mongoose

const CommentSchema = new Schema({
    content: {},
    author: {},
},{timestamps: true})

const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment