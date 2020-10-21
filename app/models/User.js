const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
	fullName: String,
	email: String,
	password: String,
	avatar: String,
	books: [{
		type: Schema.Types.ObjectId,
		ref: "Book"
	}],
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}],
	reading: [{
		type: Schema.Types.ObjectId,
		ref: "Book"
	}],
	website: String,
	role: {
		type: String,
		default: "member"
	}
})

module.exports = model("User", UserSchema)