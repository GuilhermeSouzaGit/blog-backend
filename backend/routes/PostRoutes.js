const router = require("express").Router()
const PostController = require("../controllers/PostController")

//middlewares
const verifyToken = require("../helpers/verify-token")
const isAdmin = require("../helpers/isAdmin")

router.get("/", verifyToken, PostController.getAllPosts)
router.post("/create", verifyToken, isAdmin, PostController.createPost)

module.exports = router