const router = require("express").Router()
const UserController = require("../controllers/UserController")

//middlewares
const verifyToken = require("../helpers/verify-token")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.patch("/edit/:id", verifyToken, UserController.editUser)
router.get("/profile/:id", verifyToken, UserController.showUser)
router.get("/liked/:id", verifyToken, UserController.likedPosts)
router.post("/password/reset", verifyToken, UserController.passwordRecovery)

module.exports = router
