require('dotenv').config()
const jwt = require("jsonwebtoken")

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id,
        isAdmin: user.isAdmin
    }, `${process.env.SECRET}`)

    res.status(200).json(({ message: "Você está autenticado", token: token, userId: user._id, admin: user.isAdmin }))
}

module.exports = createUserToken
