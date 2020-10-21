module.exports = (req, res, next) => {
	if(!req.session.auth) {
		req.flash("error", "Login to continue")
		res.redirect("/login")
	} else {
		next()
	}
}