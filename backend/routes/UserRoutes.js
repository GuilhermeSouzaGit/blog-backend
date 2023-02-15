const router = require("express").Router()
const UserController = require("../controllers/UserController")

//middlewares


router.post("/register", UserController.register)

module.exports = router