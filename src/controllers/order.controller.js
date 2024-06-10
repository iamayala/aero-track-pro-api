const db = require("./_index")

// Create an order
exports.post = (req, res) => {
	const { part_id, quantity, order_date, expected_delivery_date, status } = req.body
	db.query(
		"INSERT INTO Orders (part_id, quantity, order_date, expected_delivery_date, status) VALUES (?, ?, ?, ?, ?)",
		[part_id, quantity, order_date, expected_delivery_date, status],
		(err, result) => {
			if (err) {
				console.error("Error creating order:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			res.status(201).json({
				id: result.insertId,
				part_id,
				quantity,
				order_date,
				expected_delivery_date,
				status,
			})
		}
	)
}

// Get all orders with parts details
exports.get = (req, res) => {
	db.query(
		"SELECT Orders.*, Parts.part_number as part_number, Parts.part_name as part_name, Parts.manufacturer as manufacturer, Parts.unit_price as unit_price FROM Orders JOIN Parts ON Orders.part_id = Parts.id",
		(err, results) => {
			if (err) {
				console.error("Error getting orders:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			res.json(results)
		}
	)
}

// Get a specific order by id with parts details
exports.getOne = (req, res) => {
	const id = req.params.id
	db.query(
		"SELECT Orders.*, Parts.part_number as part_number, Parts.part_name as part_name, Parts.manufacturer as manufacturer, Parts.unit_price as unit_price FROM Orders JOIN Parts ON Orders.part_id = Parts.id WHERE Orders.id = ?",
		[id],
		(err, results) => {
			if (err) {
				console.error("Error getting order:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			if (results.length === 0) {
				return res.status(404).json({ message: "Order not found" })
			}
			res.json(results[0])
		}
	)
}

// Update an order
exports.put = (req, res) => {
	const id = req.params.id
	const { part_id, quantity, order_date, expected_delivery_date, status } = req.body
	db.query(
		"UPDATE Orders SET part_id=?, quantity=?, order_date=?, expected_delivery_date=?, status=? WHERE id=?",
		[part_id, quantity, order_date, expected_delivery_date, status, id],
		(err, result) => {
			if (err) {
				console.error("Error updating order:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			if (result.affectedRows === 0) {
				return res.status(404).json({ message: "Order not found" })
			}
			res.json({ id, part_id, quantity, order_date, expected_delivery_date, status })
		}
	)
}

// Delete an order
exports.delete = (req, res) => {
	const id = req.params.id
	db.query("DELETE FROM Orders WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.error("Error deleting order:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Order not found" })
		}
		res.status(200).json({ message: "Order deleted successfully" })
	})
}
