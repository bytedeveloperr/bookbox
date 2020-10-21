const router = require("express").Router()
const { getUserAccount } = require("../controllers/UserController")

/* GET /:userId - user profile route */
router.get('/:userId', getUserAccount)

/* PUT /:userId - update user route */
router.put('/:userId', (req, res) => {
	res.send("PUT /:userId - update user route")
})

/* DELETE /:userId - delete user route */
router.delete('/:userId', (req, res) => {
	res.send("DELETE /:userId - delete user route")
})

module.exports = router