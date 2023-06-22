const User = require("../models/User")

module.exports = class AdminController {
    static async getAllUsers(req, res, next) {
        const users = await User.find().sort("-createdAt")

        //check if user exists
        res.status(200).json({users: users})
        
    }
}