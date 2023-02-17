const router = require("express").Router()
const AdminController = require("../controllers/AdminController")

//middlewares
const isAdmin = require("../helpers/isAdmin")

router.get("/dashboard", isAdmin, AdminController.getAllUsers)

module.exports = router