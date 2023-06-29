require('dotenv').config()
const mongoose = require("mongoose")

async function conn() {
    mongoose.set("strictQuery", true)
    await mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.kbonfpo.mongodb.net/?retryWrites=true&w=majority`)
    console.log("Conectou ao Mongoose!")

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Erro de conexão:'));
    db.once('open', () => {
        console.log('Conexão bem-sucedida com o banco de dados.');
    });
}

conn().catch((err) => console.log(err))

module.exports = mongoose
