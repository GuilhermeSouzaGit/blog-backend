async function isAdmin(user, req, res, next) {

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