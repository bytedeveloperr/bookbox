const { Schema, model } = require("mongoose")

const CommentSchema = new Schema({
	author: String,
	text: String,
	books: [{
		type: Schema.Types.ObjectId,
		ref: "Book"
	}]
})

module.exports = model("Comment", CommentSchema)