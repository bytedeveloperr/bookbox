const response = require("../libs/response")
const User = require("../models/User")
const { isEmpty, isEmail, isLength, escape, normalizeEmail, trim } = require("validator")
const xss = require("xss")
const argon2 = require("argon2")
const _ = require("lodash")

class AuthService {

	async handleRegister(data) {
		let { fullName, email, password } = data
		if (isEmpty(fullName) || isEmpty(email) || isEmpty(password)) {
			return response({ message: "All fields must be filled", data: null, success: false })
		} else {
			if (!isEmail(email)) {
				return response({ message: "Enter a valid email", data: null, success: false })
			} else {
				if (!isLength(password, { min: 6 })) {
					return response({ message: "Password must not be less than six characters", data: null, success: false })
				} else {
					fullName = xss(trim(escape(fullName)))
					email = xss(trim(escape(normalizeEmail(email))))
					password = xss(trim(escape(password)))
					try {
						let existingUser = await User.findOne({ email })
						if (existingUser) {
							return response({ message: "A user with that email already exists in our records", data: null, success: false })
						} else {
							try {
								password = await argon2.hash(password)
								let newUser = new User({ fullName, email, password })
								try {
									let user = await newUser.save()
									user = _.pick(user, ['_id'])
									return response({ message: "Registration Successful", data: user, success: true })
								} catch(e) {
									return response({ message: "A error occured. please try again", data: null, success: false })
								}
							} catch(e) {
								return response({ message: `An error occured. please try again: ${e}`, data: null, success: false })
							}
						}
					} catch(e) {
						return response({ message: `An error occured. please try again: ${e}`, data: null, success: false })
					}
				}
			}
		}
	}

	async handleLogin(data) {
		let { email, password } = data
		if (isEmpty(email) || isEmpty(password)) {
			return response({ message: "All fields must be filled", data: null, success: false })
		} else {
			if (!isEmail(email)) {
				return response({ message: "Enter a valid email", data: null, success: false })
			} else {
				if (!isLength(password, { min: 6 })) {
					return response({ message: "Password must not be less than six characters", data: null, success: false })
				} else {
					email = xss(trim(escape(normalizeEmail(email))))
					password = xss(trim(escape(password)))
					try {
						let user = await User.findOne({ email })
						if (user) {
							try {
								let match = await argon2.verify(user.password, password)
								if(match) {
									user = _.pick(user, ['_id'])
									return response({ message: "Login Successful", data: user, success: true })
								} else {
									return response({ message: "The password you entered is not", data: null, success: false })
								}
							} catch(e) {
								return response({ message: `An error occured. please try again: ${e}`, data: null, success: false })
							}
						} else {
							return response({ message: "Email does not match any of our records", data: null, success: false })
						}
					} catch(e) {
						return response({ message: `An error occured. please try again: ${e}`, data: null, success: false })
					}
				}
			}
		}
	}
}

module.exports = new AuthService()