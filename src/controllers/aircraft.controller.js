const db = require("./_index")

// Create a new aircraft
exports.post = (req, res) => {
	const {
		registration_number,
		manufacturer,
		model,
		year_of_manufacture,
		capacity,
		fuel_capacity,
		max_speed,
		max_range,
		current_location,
		status,
	} = req.body

	// Check if registration number already exists
	db.query(
		"SELECT * FROM Aircrafts WHERE registration_number = ?",
		[registration_number],
		(selectErr, selectResults) => {
			if (selectErr) {
				console.error("Error checking registration number:", selectErr)
				return res.status(500).json({ message: "Internal server error" })
			}

			// If registration number already exists, return error
			if (selectResults.length > 0) {
				return res
					.status(400)
					.json({ message: "Aircraft with this registration number already exists" })
			}

			// If registration number does not exist, proceed with insertion
			db.query(
				"INSERT INTO Aircrafts (registration_number, manufacturer, model, year_of_manufacture, capacity, fuel_capacity, max_speed, max_range, current_location, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
				[
					registration_number,
					manufacturer,
					model,
					year_of_manufacture,
					capacity,
					fuel_capacity,
					max_speed,
					max_range,
					current_location,
					status,
				],
				(insertErr, results) => {
					if (insertErr) {
						console.error("Error creating aircraft:", insertErr)
						return res.status(500).json({ message: "Internal server error" })
					}
					res.status(201).json({
						message: "Aircraft created successfully",
						id: results.insertId,
					})
				}
			)
		}
	)
}

// Get all aircrafts
exports.get = (req, res) => {
	db.query("SELECT * FROM Aircrafts", (err, results) => {
		if (err) {
			console.error("Error getting aircrafts:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		res.json(results)
	})
}

// Get a specific aircraft by id
exports.getOne = (req, res) => {
	const id = req.params.id
	db.query("SELECT * FROM Aircrafts WHERE id = ?", [id], (err, results) => {
		if (err) {
			console.error("Error getting aircraft:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		if (results.length === 0) {
			return res.status(404).json({ message: "Aircraft not found" })
		}
		res.json(results[0])
	})
}

// Update an existing aircraft
exports.put = (req, res) => {
	const id = req.params.id
	const {
		registration_number,
		manufacturer,
		model,
		year_of_manufacture,
		capacity,
		fuel_capacity,
		max_speed,
		max_range,
		current_location,
		status,
	} = req.body

	db.query(
		"UPDATE Aircrafts SET registration_number=?, manufacturer=?, model=?, year_of_manufacture=?, capacity=?, fuel_capacity=?, max_speed=?, max_range=?, current_location=?, status=? WHERE id=?",
		[
			registration_number,
			manufacturer,
			model,
			year_of_manufacture,
			capacity,
			fuel_capacity,
			max_speed,
			max_range,
			current_location,
			status,
			id,
		],
		(err, results) => {
			if (err) {
				console.error("Error updating aircraft:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			res.json({ message: "Aircraft updated successfully" })
		}
	)
}

// Delete an aircraft
exports.delete = (req, res) => {
	const id = req.params.id
	db.query("DELETE FROM Aircrafts WHERE id = ?", [id], (err, results) => {
		if (err) {
			console.error("Error deleting aircraft:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		res.json({ message: "Aircraft deleted successfully" })
	})
}
