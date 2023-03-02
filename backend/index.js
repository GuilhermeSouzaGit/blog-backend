const express = require("express")
const cors = require("cors")

const app = express()

const conn = require("./db/conn")

//config JSON response
app.use(express.json())

app.use(cors({credentials: true, origin: "http://localhost:3000"}))

app.use(express.static("public"))

const UserRoutes = require("./routes/UserRoutes")
const AdminRoutes = require("./routes/AdminRoutes")
const PostRoutes = require("./routes/PostRoutes")

app.use("/users", UserRoutes)
app.use("/admin", AdminRoutes)
app.use("/posts", PostRoutes)

app.listen(5000)