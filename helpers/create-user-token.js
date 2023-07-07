require('dotenv').config()
const jwt = require("jsonwebtoken")

const createUserToken = async (user, req, res) => {
    const express = require("express")
    const cookieParser = require("cookie-parser")
    const app = express()
    app.use(cookieParser())

    const token = jwt.sign({
        name: user.name,
        id: user._id,
        isAdmin: user.isAdmin
    }, `${process.env.SECRET}`)

    //return token
    res.cookie("auth", token)
    res.status(200).json(({ message: "Você está autenticado", token: token, userId: user._id, }))
}

module.exports = createUserToken
