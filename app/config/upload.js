const path = require("path")
const multer = require("multer")
// const cloudinary = require("cloudinary").v2
// const { CloudinaryStorage } = require("multer-storage-cloudinary")

const diskStorage = multer.diskStorage({
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}-${(file.originalname)}`)
	},


	destination: (req, file, callback) => {
		if (file.mimetype == "application/pdf") {
			callback(null, path.join(__dirname, "../../uploads/books"))
		} else if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
			callback(null, path.join(__dirname, "../../uploads/images"))
		}
	}
})

const fileFilter = (req, file, callback) => {
	let allowedMimes = ["application/pdf", "image/png", "image/jpg", "image/jpeg"]
	if (!allowedMimes.includes(file.mimetype)) {
		// callback(null, false)
		return callback(new Error("The file you are trying to upload is not supported"))
	}
	callback(null, true)
}

module.exports = multer({ storage: diskStorage, fileFilter })