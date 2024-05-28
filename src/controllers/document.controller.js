const db = require("./_index")

// Create a document
exports.post = (req, res) => {
	const { document_type, document_name, document_description, document_url } = req.body
	db.query(
		"INSERT INTO Documents (document_type, document_name, document_description, document_url) VALUES (?, ?, ?, ?)",
		[document_type, document_name, document_description, document_url],
		(err, result) => {
			if (err) {
				console.error("Error creating document:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			res.status(201).json({
				id: result.insertId,
				document_type,
				document_name,
				document_description,
				document_url,
			})
		}
	)
}

// Get all documents
exports.get = (req, res) => {
	db.query("SELECT * FROM Documents", (err, results) => {
		if (err) {
			console.error("Error getting documents:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		res.json(results)
	})
}

// Get a specific document by id
exports.getOne = (req, res) => {
	const id = req.params.id
	db.query("SELECT * FROM Documents WHERE id = ?", [id], (err, results) => {
		if (err) {
			console.error("Error getting document:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		if (results.length === 0) {
			return res.status(404).json({ message: "Document not found" })
		}
		res.json(results[0])
	})
}

// Update a document
exports.put = (req, res) => {
	const id = req.params.id
	const { document_type, document_name, document_description, document_url } = req.body
	db.query(
		"UPDATE Documents SET document_type=?, document_name=?, document_description=?, document_url=? WHERE id=?",
		[document_type, document_name, document_description, document_url, id],
		(err, result) => {
			if (err) {
				console.error("Error updating document:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			if (result.affectedRows === 0) {
				return res.status(404).json({ message: "Document not found" })
			}
			res.json({ id, document_type, document_name, document_description, document_url })
		}
	)
}

// Delete a document
exports.delete = (req, res) => {
	const id = req.params.id
	db.query("DELETE FROM Documents WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.error("Error deleting document:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Document not found" })
		}
		res.json({ message: "Document deleted successfully" })
	})
}
