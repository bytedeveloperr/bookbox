const router = require("express").Router()
const { home, explore } = require("../controllers/IndexController")
const isAuth = require("../middlewares/isAuth")

/* GET / - index route */
router.get('/', isAuth, home)

/* GET /explore - explore route */
router.get('/explore', explore)

/* GET /contact - contact route */
router.get('/contact', (req, res) => {
	res.send("GET /contact - contact route")
})

/* GET /about - about route */
router.get('/about', (req, res) => {
	res.send("GET /about - about route")
})

module.exports = router