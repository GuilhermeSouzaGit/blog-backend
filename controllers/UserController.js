const User = require("../models/User")
const Posts = require("../models/Posts")
const bcrypt = require("bcrypt")
const sendEmail = require("../helpers/mail-sender")

//helpers
const createUserToken = require("../helpers/create-user-token")
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, password, confirmPassword } = req.body

        //validations
        if (!name) return res.status(422).json({ message: "O nome é obrigatório!" })
        if (!email) return res.status(422).json({ message: "O e-mail é obrigatório!" })
        if (!password) return res.status(422).json({ message: "A senha é obrigatória!" })
        if (password !== confirmPassword) return res.status(422).json({ message: "As senhas não conferem!" })

        //check if user already exist
        const userExist = await User.findOne({ email: email })

        if (userExist) return res.status(422).json({ message: "Por favor, utilize outro e-mail!" })

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
            await sendEmail(email);

            console.log(newUser)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    static async login(req, res) {

        const { email, password } = req.body

        if (!email) return res.status(422).json({ message: "O e-mail é obrigatório" })
        if (!password) return res.status(422).json({ message: "A senha é obrigatória" })

        //check if user exists
        const user = await User.findOne({ email: email })

        if (!user) return res.status(422).json({ message: "Não há usuário cadastrado com este e-mail" })

        //check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) return res.status(422).json({ message: "Senha incorreta" })

        await createUserToken(user, req, res)

    }
    static async editUser(req, res) {
        //check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)

        const { name, email, password, confirmPassword } = req.body

        //check if email has already taken
        const userExist = await User.findOne({ email: email })

        if (user.email !== email && userExist) return res.status(422).json({ message: "Por favor, utilize outro e-mail!" })

        if (password !== confirmPassword) {
            return res.status(422).json({ message: "As senhas não conferem" })
        } else if (password === confirmPassword && password != null) {
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

            res.status(200).json({ message: "Usuário atualizado com sucesso!" })
        } catch (error) {

            res.status(500).json({ message: err })
            return
        }
    }
    static async showUser(req, res) {
        const userId = req.params.id
        const user = await User.findById(userId)

        res.status(200).json({ user })
    }
    static async likedPosts(req, res) {
        try {
            const userId = req.params.id
            const user = await User.findById(userId)

            const likedPostsId = user.likedPosts
            const likedPosts = await Posts.find({ _id: likedPostsId })

            res.status(200).json(likedPosts)
        } catch (error) {
            res.status(500).json({ message: error })
            return
        }
    }
    static async passwordRecovery(req, res) {
        const { email } = req.body

        if (!email) return res.status(422).json({ message: "O e-mail é obrigatório" })

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const message = {
            from: "noreply@blog.com",
            to: email,
            subject: "Recuperação de senha",
            text: "Plaintext version of the message",
            html: "<p>HTML version of the message</p>"
        };

        transport.sendMail(message, function (err) {
            if (!err) return res.status(400).json({ message: "Erro ao enviar o e-mail" })
        })

    }
}
