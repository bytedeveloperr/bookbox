if(process.env.NODE_ENV !== 'production') {
	require("dotenv").config()
}
const express = require("express")
const path = require("path")
const cookie = require("cookie-parser")
const http = require("http")
const flash = require("express-flash")
const ejsMate = require("ejs-mate")
const csrf = require("csurf")
const session = require("./app/config/session")
const routes = require("./app/routes/main")

require("./app/config/database")
require("./app/config/global")

const app = express()
const server = http.createServer(app)

app.engine('ejs', ejsMate)
app.set("view engine", 'ejs')
app.set('views', path.join(__dirname, 'app/views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookie(process.env.COOKIE_SECRET))
app.use(session)
app.use(flash())
app.use(csrf())
app.use('/public', express.static(path.join(__dirname, "public")))
app.use('/upload', express.static(path.join(__dirname, "uploads")))
app.use(routes)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => print(`Listening on port ${PORT}`))