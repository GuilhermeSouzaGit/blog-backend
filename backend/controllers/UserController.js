const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//helpers
const createUserToken = require("../helpers/create-user-token")
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

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
        const user = await User.findOne({ email: email })

        if(!user) return res.status(422).json({message: "Não há usuário cadastrado com este e-mail"})

        //check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword) return res.status(422).json({message: "Senha incorreta"})

        await createUserToken(user, req, res)
        
    }
    static async editUser(req, res) {
        const id = req.params.id

        //check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)

        const { name, email, phone, password, confirmpassword } = req.body

        //validations
        if(!name) return res.status(422).json({message: "O nome é obrigatório!"})
        user.name = name

        if(!email) return res.status(422).json({message: "O e-mail é obrigatório"})
        user.email = email

        //check if email has already taken
        const userExist = await User.findOne({ email: email })

        if(user.email !== email && userExist) return res.status(422).json({message: "Por favor, utilize outro e-mail!"})

        if (password !== confirmpassword) {
            return res.status(422).json({message: "As senhas não conferem"})
        } else if (password === confirmpassword && password != null) {
            //creating a new password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            //returns user updated data
            await User.findOneAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true },
            )

            res.status(200).json({message: "Usuário atualizado com sucesso!"})
        } catch (error) {
            
            res.status(500).json({message: err})
            return
        }
    }
    static async showUser(req, res) {
        //check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)

        res.status(200).json({message: `O nome do usuário é ${user.name} e o e-mail é ${user.email}`})
    }
    static async passwordRecovery(req, res) {

    }
}