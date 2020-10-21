const AuthService = require("../services/AuthService")

class AuthController {

	async registerPage(req, res) {
		let data = {
			title: "Register",
			csrfToken: req.csrfToken()
		}
		res.render("register", data)
	}

	async loginPage(req, res) {
		let data = {
			title: "Login",
			csrfToken: req.csrfToken()
		}
		res.render("login", data)
	}

	async handleRegister(req, res) {
		let response = await AuthService.handleRegister(req.body)

		if (!response.success) {
			req.flash("error", response.message)
			res.redirect("/register")
		} else {
			req.session.auth = true
			req.session._id = response.data._id
			res.redirect('/')
		}
	}

	async handleLogin(req, res) {
		let response = await AuthService.handleLogin(req.body)

		if (!response.success) {
			req.flash("error", response.message)
			res.redirect("/login")
		} else {
			req.session.auth = true
			req.session._id = response.data._id
			res.redirect('/')
		}
	}

	async handleLogout(req, res) {
		req.session.destroy()
		res.redirect("/login")
	}
}

module.exports = new AuthController()