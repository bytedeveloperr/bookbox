class UserController {

	async getUserAccount(req, res) {
		let data = {
			title: "User Account"
		}
		res.render("user/profile", data)
	}
}

module.exports = new UserController()