const router = require("express").Router()
const UserController = require("../controllers/UserController")

//middlewares
const isAdmin = require("../helpers/isAdmin")


router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/", UserController.getAllUsers)
router.get("/dashboard", isAdmin, UserController.getAllUsers)

module.exports = router