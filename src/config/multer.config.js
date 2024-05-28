const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../uploads") // Destination folder for uploaded files
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}_${path.basename(file.originalname)}`)
	},
})

const upload = multer({ storage: storage })

module.exports = upload
