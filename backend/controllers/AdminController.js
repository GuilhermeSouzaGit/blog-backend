const User = require("../models/User")

//helpers
const isAdmin = require("../helpers/isAdmin")
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class AdminController {
    static async getAllUsers(req, res, next) {
        const users = await User.find().sort("-createdAt")

        //check if user exists
        const token = await getToken(req)
        if(!token) return res.status(401).json({message: "Token não existente ou inválido"})
        const user = await getUserByToken(token, res)
        await isAdmin(user, req, res, next)

        if(user.isAdmin) {
            res.status(200).json({users: users})
        }
        
    }
}