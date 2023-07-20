const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

const conn = require("./db/conn")

const port = process.env.PORT

//config JSON response
app.use(express.json())

app.use(cors({ credentials: true, origin: ["https://blog-frontend-eosin.vercel.app", "http://localhost:3000", "http://192.168.1.15:3000"] }))

app.use(cookieParser())

app.use(express.static("public"))

const UserRoutes = require("./routes/UserRoutes")
const AdminRoutes = require("./routes/AdminRoutes")
const PostRoutes = require("./routes/PostRoutes")

app.use("/users", UserRoutes)
app.use("/admin", AdminRoutes)
app.use("/posts", PostRoutes)

app.listen(port, console.log(`Server rodando na porta ${port}`))
