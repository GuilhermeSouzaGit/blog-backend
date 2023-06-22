const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

async function isAdmin(req, res, next) {
    const token = await getToken(req)
    if(!token) return res.status(401).json({message: "Token não existente ou inválido"})
    const user = await getUserByToken(token, res)

    console.log(user.isAdmin, user.email)
    try {
        if(user.isAdmin) {
            return next()
        } else {
            return res.status(403).json({message: "Você não tem as permissões necessárias"})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Erro interno do servidor"})
    }

}

module.exports = isAdmin