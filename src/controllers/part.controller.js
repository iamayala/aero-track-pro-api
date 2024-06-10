const db = require("./_index")

exports.post = async (req, res) => {
	try {
		const {
			part_number,
			part_name,
			manufacturer,
			description,
			unit_price,
			quantity,
			location,
			status,
		} = req.body

		// Insert part into the database
		db.query(
			"INSERT INTO Parts (part_number, part_name, manufacturer, description, unit_price, quantity, location, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			[
				part_number,
				part_name,
				manufacturer,
				description,
				unit_price,
				quantity,
				location,
				status,
			],
			(err, result) => {
				if (err) {
					console.error("Error inserting part:", err)
					return res.status(500).json({ message: "Internal server error" })
				}
				res.status(201).json({
					id: result.insertId,
					part_number,
					part_name,
					manufacturer,
					description,
					unit_price,
					quantity,
					location,
					status,
				})
			}
		)
	} catch (error) {
		console.error("Error creating part:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}

// Get all parts
exports.get = (req, res) => {
	db.query("SELECT * FROM Parts", (err, results) => {
		if (err) {
			console.error("Error getting parts:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		res.json(results)
	})
}

// Get a specific part by id
exports.getOne = (req, res) => {
	const id = req.params.id
	db.query("SELECT * FROM Parts WHERE id = ?", [id], (err, results) => {
		if (err) {
			console.error("Error getting part:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		if (results.length === 0) {
			return res.status(404).json({ message: "Part not found" })
		}
		res.json(results[0])
	})
}

// Update a part
exports.put = (req, res) => {
	const id = req.params.id
	const {
		part_number,
		part_name,
		manufacturer,
		description,
		unit_price,
		quantity,
		location,
		status,
	} = req.body

	// Function to create an order
	const handleCreateOrder = () => {
		const order_date = new Date().toISOString().slice(0, 10) // Current date
		const expected_delivery_date = new Date().toISOString().slice(0, 10) // Current date
		const orderStatus = "placed" // Set the order status as pending by default

		// Check if there is an existing pending order for the part
		db.query(
			"SELECT * FROM Orders WHERE part_id = ? AND status = 'placed'",
			[id],
			(err, result) => {
				if (err) {
					console.error("Error checking for existing order:", err)
					return res.status(500).json({ message: "Internal server error" })
				}

				// If an existing pending order is found, do not create a new order
				if (result.length > 0) {
					console.log(
						"An existing pending order already exists for the part. No new order will be created."
					)
					return
				}

				// Create a new order if no pending order exists
				db.query(
					"INSERT INTO Orders (part_id, quantity, order_date, expected_delivery_date, status) VALUES (?, ?, ?, ?, ?)",
					[id, 3 - quantity, order_date, expected_delivery_date, orderStatus], // Automatically order enough to bring quantity to 3
					(err, result) => {
						if (err) {
							console.error("Error creating order:", err)
							return res.status(500).json({ message: "Internal server error" })
						}
						console.log("Order created successfully")
					}
				)
			}
		)
	}

	// Check if quantity is less than 3, if so, create an order
	if (quantity < 3) {
		handleCreateOrder()
	}

	db.query(
		"UPDATE Parts SET part_number=?, part_name=?, manufacturer=?, description=?, unit_price=?, quantity=?, location=?, status=? WHERE id=?",
		[
			part_number,
			part_name,
			manufacturer,
			description,
			unit_price,
			quantity,
			location,
			status,
			id,
		],
		(err, result) => {
			if (err) {
				console.error("Error updating part:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			if (result.affectedRows === 0) {
				return res.status(404).json({ message: "Part not found" })
			}
			res.status(200).json({
				id,
				part_number,
				part_name,
				manufacturer,
				description,
				unit_price,
				quantity,
				location,
				status,
			})
		}
	)
}

// Delete a part
exports.delete = (req, res) => {
	const id = req.params.id
	db.query("DELETE FROM Parts WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.error("Error deleting part:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Part not found" })
		}
		res.status(200).json({ message: "Part deleted successfully" })
	})
}
