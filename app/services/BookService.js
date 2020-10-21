const Book = require("../models/Book")
const { isEmpty, escape, trim } = require("validator")
const xss = require("xss")
const _ = require("lodash")
const response = require("../libs/response")

class BookService {

	async handleBookUpload(body, files, uploader) {
		let { title, description, author } = body

		if (isEmpty(title) || isEmpty(description) || isEmpty(author)) {
			return response({ message: "All fields are required", data: null, success: false})
		} else {
			if (files.book) {
				let bookUrl = files.book[0].filename
				let bookSize = files.book[0].size
				let coverUrl
				if (!files.cover) {
					coverUrl = ""
				} else {
					coverUrl = files.cover[0].filename
				}
				title = xss(escape(trim(title)))
				description = xss(escape(trim(description)))
				author = xss(escape(trim(author)))
				try {
					let newBook = new Book({ title, description, author, uploader, bookUrl, bookSize, coverUrl })
					newBook = await newBook.save()
					return response({ message: "Book has been uploaded", data: newBook, success: true})
				} catch(e) {
					return response({ message: "An error occured. please try again", data: null, success: null })
				}
			} else {
				return response({ message: "You must select a book to upload", data: null, success: false})
			}
			
		}
	}

	async getSingleBook(_id) {
		try {
			let book = await Book.findOne({ _id }).populate({ path: "uploader", select: 'fullName' }).exec()
			return response({ message: "Book fetched", data: book, success: true })
		} catch(e) {
			return response({ message: "An error occured. please try again" + e, data: null, success: false })
		}
	}

	async getLatestBooks() {
		try {
			let books = await Book.find({}).limit(10).exec()
			return response({ message: "Book fetched", data: books.reverse(), success: true })
		} catch(e) {
			return response({ message: "An error occured. please try again" + e, data: null, success: false })
		}
	}

	async getRandomBooks() {
		try {
			let books = await Book.find({})
			return response({ message: "Book fetched", data: books, success: true })
		} catch(e) {
			return response({ message: "An error occured. please try again" + e, data: null, success: false })
		}
	}
}

module.exports = new BookService()