const router = require("express").Router()
const { uploadBookPage, handleBookUpload, getSingleBook } = require("../controllers/BookController")
const upload = require("../config/upload")
const isAuth = require("../middlewares/isAuth")

/* GET /book/upload - upload book route */
router.get('/upload', uploadBookPage)

/* POST /upload - upload book route */
router.post('/upload', isAuth, upload.fields([{ name: 'book', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), handleBookUpload)

/* GET /:bookId/read - read book route */
router.get('/:bookId/read', (req, res) => {
	res.send("GET /:bookId/read - read book route")
})

/* GET /category/:category - book category route */
router.get('/category/:category', (req, res) => {
	res.send("GET /category/:category - book category route")
})

/* GET /:bookId/edit - edit book route */
router.get('/:bookId/edit', (req, res) => {
	res.send("GET /:bookId/edit - edit book route")
})

/* GET /:bookId - show book route */
router.get('/:bookId', getSingleBook)

/* PUT /:bookId - edit book route */
router.put('/:bookId', (req, res) => {
	res.send("PUT /:bookId - edit book route")
})

/* DELETE /:bookId - delete book route */
router.delete('/:bookId', (req, res) => {
	res.send("DELETE /:bookId - delete book route")
})

/* POST /:bookId/comment - create comment route */
router.post('/:bookId/comment', (req, res) => {
	res.send("POST /:bookId/comment - create comment route")
})

/* DELETE /:bookId/comment/:commentId - delete comment route */
router.delete('/:bookId/comment/:commentId', (req, res) => {
	res.send("DELETE /:bookId/comment/:commentId - delete comment route")
})

module.exports = router