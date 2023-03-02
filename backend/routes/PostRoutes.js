const router = require("express").Router()
const PostController = require("../controllers/PostController")

//middlewares
const verifyToken = require("../helpers/verify-token")
const isAdmin = require("../helpers/isAdmin")

router.get("/", verifyToken, PostController.getAllPosts)
router.post("/create", verifyToken, isAdmin, PostController.createPost)
router.post("/:id/like", verifyToken, PostController.like)
router.post("/:id/comment", verifyToken, PostController.comment)

module.exports = router