const db = require("./_index")

// Create a Flight
exports.post = (req, res) => {
	const {
		flight_number,
		departure_airport,
		departure_datetime,
		arrival_airport,
		arrival_datetime,
		aircraft_id,
		pilot_id,
		co_pilot_id,
		crew_members,
		passengers,
		status,
	} = req.body

	db.query(
		"INSERT INTO Flights (flight_number, departure_airport, departure_datetime, arrival_airport, arrival_datetime, aircraft_id, pilot_id, co_pilot_id, crew_members, passengers, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			flight_number,
			departure_airport,
			departure_datetime,
			arrival_airport,
			arrival_datetime,
			aircraft_id,
			pilot_id,
			co_pilot_id,
			JSON.stringify(crew_members),
			JSON.stringify(passengers),
			status,
		],
		(err, results) => {
			if (err) {
				console.error("Error creating flight:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			res.status(201).json({ message: "Flight created successfully", id: results.insertId })
		}
	)
}

// Get all Flights with aircraft details
exports.get = (req, res) => {
	db.query(
		"SELECT Flights.*, Aircrafts.* FROM Flights JOIN Aircrafts ON Flights.aircraft_id = Aircrafts.id",
		(err, results) => {
			if (err) {
				console.error("Error getting flights:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			res.json(results)
		}
	)
}

// Get a specific Flight by id with aircraft details
exports.getOne = (req, res) => {
	const id = req.params.id
	db.query(
		"SELECT Flights.*, Aircrafts.* FROM Flights JOIN Aircrafts ON Flights.aircraft_id = Aircrafts.id WHERE Flights.id = ?",
		[id],
		(err, results) => {
			if (err) {
				console.error("Error getting flight:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			if (results.length === 0) {
				return res.status(404).json({ message: "Flight not found" })
			}
			res.json(results[0])
		}
	)
}

// Update an existing Flight
exports.put = (req, res) => {
	const id = req.params.id
	const {
		flight_number,
		departure_airport,
		departure_datetime,
		arrival_airport,
		arrival_datetime,
		aircraft_id,
		pilot_id,
		co_pilot_id,
		crew_members,
		passengers,
		status,
	} = req.body

	db.query(
		"UPDATE Flights SET flight_number=?, departure_airport=?, departure_datetime=?, arrival_airport=?, arrival_datetime=?, aircraft_id=?, pilot_id=?, co_pilot_id=?, crew_members=?, passengers=?, status=? WHERE id=?",
		[
			flight_number,
			departure_airport,
			departure_datetime,
			arrival_airport,
			arrival_datetime,
			aircraft_id,
			pilot_id,
			co_pilot_id,
			JSON.stringify(crew_members),
			JSON.stringify(passengers),
			status,
			id,
		],
		(err, results) => {
			if (err) {
				console.error("Error updating flight:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			res.json({ message: "Flight updated successfully" })
		}
	)
}

// Delete a Flight
exports.delete = (req, res) => {
	const id = req.params.id
	db.query("DELETE FROM Flights WHERE id = ?", [id], (err, results) => {
		if (err) {
			console.error("Error deleting flight:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		res.json({ message: "Flight deleted successfully" })
	})
}
