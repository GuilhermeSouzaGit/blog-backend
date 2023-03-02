const Posts = require("../models/Posts")

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

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
    static async like(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)
        
        const userId = user._id;
        const postId = req.params.id;

        const post = await Posts.findById(postId)
        try {

            if(post.likes.includes(userId)) {
                post.likes.pull(userId)
                post.likesCount -= 1;

                user.likedPosts.pull(postId)
            }else {
                post.likes.push(userId)
                post.likesCount += 1;

                user.likedPosts.push(postId)
            }

            await post.save()
            await user.save()
            return res.json(post)
        } catch (error) {
            console.log(error)
        }
    }
    static async comment(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)
        const postId = req.params.id

        const { text } = req.body
        const postedBy = user.name

        const post = await Posts.findById(postId)

        if(!text) return res.status(422).json({message: "Conteúdo do comentário é obrigatório"})

        try {
            post.comments.push({ text, postedBy})

            await post.save()
            res.json(post)
        } catch (error) {
            console.log(error)
        }
    }
}