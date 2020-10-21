const router = require("express").Router()
const { loginPage, registerPage, handleRegister, handleLogin, handleLogout } = require("../controllers/AuthController")

/* GET /login - login route */
router.get('/login', loginPage)

/* POST /login - login route */
router.post('/login', handleLogin)

/* GET /register - register route */
router.get('/register', registerPage)

/* POST /register - register route */
router.post('/register', handleRegister)

/* GET /logout - logout route */
router.get('/logout', handleLogout)

module.exports = router