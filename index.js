const express = require("express")
const cors = require("cors")
const cloudinary = require("cloudinary").v2;

const app = express()

const conn = require("./db/conn")

const port = process.env.PORT

app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://blog-frontend-eosin.vercel.app/"] }))

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
})
//config JSON response
app.use(express.json())


app.use(express.static("public"))

const UserRoutes = require("./routes/UserRoutes")
const AdminRoutes = require("./routes/AdminRoutes")
const PostRoutes = require("./routes/PostRoutes")

app.use("/users", UserRoutes)
app.use("/admin", AdminRoutes)
app.use("/posts", PostRoutes)

app.listen(port, console.log(`Server rodando na porta ${port}`))
