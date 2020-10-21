const BookService = require("../services/BookService")

class BookController {

	async uploadBookPage(req, res) {
		let data = {
			title: "Upload a Book",
			csrfToken: req.csrfToken()
		}
		res.render("book/upload", data)
	}

	async handleBookUpload(req, res) {
		let response = await BookService.handleBookUpload(req.body, req.files, req.session._id)
		if (response.success) {
			res.redirect(`/book/${response.data._id}`)
		} else {
			req.flash("error", response.message)
			res.redirect('/book/upload')
		}
	}

	async getSingleBook(req, res) {
		let response = await BookService.getSingleBook(req.params.bookId)
		let data = {
			title: response.data.title,
			book: response.data
		}
		res.render("book/single", data)
	}
	
}

module.exports = new BookController()