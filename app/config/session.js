const session = require("express-session")
const MongoStore = require("connect-mongodb-session")(session)

module.exports = session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		uri: process.env.MONGO_URI,
		collection: 'sessions'
	})
})