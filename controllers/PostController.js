const Posts = require("../models/Posts")
const cloudinary = require("cloudinary").v2

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class PostController {
    static async createPost(req, res) {
        const files = req.files;
        const { title, content, author } = req.body

        if (!title) return res.status(422).json({ message: "Para criar um post o campo title é obrigatório" })
        if (!content) return res.status(422).json({ message: "Para criar um post o campo content é obrigatório" })
        if (!author) return res.status(422).json({ message: "Para criar um post o campo author é obrigatório" })

        try {
            const newPost = await Posts.create({
                title,
                content,
                author,
            })
            console.log(newPost, "NEW POST")

            const postId = newPost._id.toString()
            console.log(postId, "POST ID")

            const imageUrls = [];

            console.log(files)
            if (files) {
                try {
                    for (const file of Object.values(files)) {
                        const buffer = file.buffer;
                        const uniqueSuffix = Math.round(Math.random() * 1E9);
                        const filename = `${postId}-${uniqueSuffix}`

                        await cloudinary.uploader.upload_stream(
                            { folder: `post-${postId}`, public_id: filename },
                            (error, result) => {
                                if (error) {
                                    console.error("Erro ao fazer o upload da imagem:", error);
                                    return res.status(500).json({ message: "Erro ao fazer o upload da imagem" });
                                }
                                console.log(result.url);
                                imageUrls.push(result.url)
                                newPost.images = imageUrls;
                            },
                        ).end(buffer);
                    }
                    newPost.save()
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({ message: "Post criado com sucesso!" })
        } catch (error) {
            console.log(error, "deu erro")
            res.status(500).json({ message: error })
        }
    }
    static async getAllPosts(req, res) {
        const posts = await Posts.find().sort("-createdAt")

        res.status(200).json({ posts: posts })
    }
    static async getUniquePost(req, res) {
        const postId = req.params
        const post = await Posts.findById(postId.id)

        try {
            if (post) return res.status(200).json(post)
        } catch (error) {
            console.log(error);
        }
    }
    static async like(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const userId = user._id;
        const postId = req.params.id;

        const post = await Posts.findById(postId)
        try {

            if (post.likes.includes(userId)) {
                post.likes.pull(userId)
                post.likesCount -= 1;

                user.likedPosts.pull(postId)
            } else {
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
        const userId = user._id

        const post = await Posts.findById(postId)

        if (!text) return res.status(422).json({ message: "Conteúdo do comentário é obrigatório" })

        try {
            console.log(userId);
            post.comments.push({ text, postedBy, userId })

            console.log(post);
            await post.save()
            res.json(post)
        } catch (error) {
            console.log(error)
        }
    }
    static async getImages(req, res) {
        const postId = req.params.id;

        try {
            const post = await Posts.findById(postId)

            if (!post) return res.status(404).json({ message: "Post não encontrado" });

            const imageUrls = post.images;

            res.status(200).json(imageUrls)
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar imagens" })
        }
    }
}
