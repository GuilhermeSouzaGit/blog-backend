const router = require("express").Router()
const UserController = require("../controllers/UserController")

//middlewares
const verifyToken = require("../helpers/verify-token")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.patch("/edit/:id", verifyToken, UserController.editUser)
router.get("/profile", verifyToken, UserController.showUser)

module.exports = router