const router = require("express").Router()
const indexRoutes = require("./index")
const authRoutes = require("./auth")
const bookRoutes = require("./book")
const userRoutes = require("./user")

/* use for auth */
router.use('/', indexRoutes)

/* use for auth */
router.use('/book', bookRoutes)

/* use for auth */
router.use('/user', userRoutes)

/* use for auth */
router.use('/', authRoutes)

module.exports = router