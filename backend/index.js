//token user = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3VpbGhlcm1lIiwiaWQiOiI2M2VkMzQwOTI3NGUwMGIyMWJhYjRkOGQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjc3NTQwNzM1fQ.SKGD0m_8MF8R2Z1UzP7oASzhGIlB0Iasmp1K8wLFfQE
// token adm = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6IjYzZWQzMjM5NzQ4MjBjZTYyMTk0ZGJlMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NzU0MDU5MX0.vlTt0cKaOGkzJtbAZQcD1HhI0v2SLxh35q12RX2-jkg

const express = require("express")
const cors = require("cors")

const app = express()

//db connection
const conn = require("./db/conn")

//config JSON response
app.use(express.json())

//Solve CORS
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

//Public folder for images
app.use(express.static("public"))

//Routes
const UserRoutes = require("./routes/UserRoutes")
const AdminRoutes = require("./routes/AdminRoutes")
const PostRoutes = require("./routes/PostRoutes")

app.use("/users", UserRoutes)
app.use("/admin", AdminRoutes)
app.use("/posts", PostRoutes)

app.listen(5000)