const db = require("./_index")

exports.get = (req, res) => {
	db.query(`SELECT * FROM Notifications`, (err, results) => {
		if (err) {
			console.error("Error fetching notifications:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		res.status(200).json(results)
	})
}
