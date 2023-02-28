const User = require("../models/User")
const Posts = require("../models/Posts")
const Comment = require("../models/Comment")

module.exports = class PostController {
    static async createPost(req, res, next) {
        const { title, content, author } = req.body

        if(!title) return res.status(422).json({message: "Para criar um post o campo title é obrigatório"})
        if(!content) return res.status(422).json({message: "Para criar um post o campo content é obrigatório"})
        if(!author) return res.status(422).json({message: "Para criar um post o campo author é obrigatório"})

        try {
            const newPost = await Posts.create({
                title,
                content,
                author
            })

            res.status(200).json({message: "Post criado com sucesso!"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
    static async getAllPosts(req, res) {
        const posts = await Posts.find().sort("-createdAt")

        res.status(200).json({ posts: posts})
    }
}