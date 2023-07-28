const router = require("express").Router()
const PostController = require("../controllers/PostController")

//middlewares
const verifyToken = require("../helpers/verify-token")
const isAdmin = require("../helpers/isAdmin")
const imageUpload = require("../helpers/image-upload")
// , upload.array("images")
const upload = imageUpload()

router.get("/", verifyToken, PostController.getAllPosts)
router.get("/post/:id", verifyToken, PostController.getUniquePost)
router.post("/create", verifyToken, isAdmin, PostController.createPost)
router.post("/:id/like", verifyToken, PostController.like)
router.post("/:id/comment", verifyToken, PostController.comment)
router.get("/get/images/:id", verifyToken, PostController.getImages)

module.exports = router
