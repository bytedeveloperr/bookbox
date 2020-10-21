const { Schema, model } = require("mongoose")

const BookSchema = new Schema({
	title: String,
	description: String,
	author: String,
	uploader: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	bookUrl: String,                
	pagesNo: Number,
	bookSize: String,
	coverUrl: String,
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}],
	downloads:{
		type: Number,
		default: 0
	},
	reads: {
		type: Number,
		default: 0
	}
})

module.exports = model("Book", BookSchema)