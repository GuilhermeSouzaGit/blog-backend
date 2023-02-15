const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//helpers
const createUserToken = require("../helpers/create-user-token")

module.exports = class UserController {
    static async register(req, res) {
        const {name, email, password, confirmpassword} = req.body

        //validations
        if(!name) return res.status(422).json({message: "O nome é obrigatório!"})
        if(!email) return res.status(422).json({message: "O e-mail é obrigatório!"})
        if(!password) return res.status(422).json({message: "A senha é obrigatória!"})
        if(password !== confirmpassword) return res.status(422).json({message: "As senhas não conferem!"})

        //check if user already exist
        const userExist = await User.findOne({ email: email})

        if(userExist) return res.status(422).json({message: "Por favor, utilize outro e-mail!"})

        //create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        try {
            const newUser = await User.create({
                name,
                email,
                password: passwordHash,
            })
            await createUserToken(newUser, req, res)

            console.log(newUser)
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
    static async login(req, res) {

        const {email, password} = req.body

        if(!email) return res.status(422).json({message: "O e-mail é obrigatório"})
        if(!password) return res.status(422).json({message: "A senha é obrigatória"})

        //check if user exists
        const userExist = await User.findOne({ email: email })

        if(!userExist) return res.status(422).json({message: "Não há usuário cadastrado com este e-mail"})

    }
}