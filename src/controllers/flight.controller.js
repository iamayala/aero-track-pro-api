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
		` SELECT 
			Flights.flight_number AS flight_number,
			Flights.departure_airport AS departure_airport,
			Flights.departure_datetime AS departure_datetime,
			Flights.arrival_airport AS arrival_airport,
			Flights.arrival_datetime AS arrival_datetime,
			Flights.aircraft_id AS flight_aircraft_id,
			Flights.pilot_id AS flight_pilot_id,
			Flights.co_pilot_id AS co_pilot_id,
			Flights.crew_members AS crew_members,
			Flights.passengers AS passengers,
			Flights.status AS flight_status,
			Aircrafts.registration_number AS aircraft_registration_number,
			Aircrafts.manufacturer AS aircraft_manufacturer,
			Aircrafts.model AS aircraft_model,
			Aircrafts.year_of_manufacture AS aircraft_year_of_manufacture,
			Aircrafts.capacity AS aircraft_capacity,
			Aircrafts.fuel_capacity AS aircraft_fuel_capacity,
			Aircrafts.max_speed AS aircraft_max_speed,
			Aircrafts.max_range AS aircraft_max_range,
			Aircrafts.current_location AS aircraft_current_location,
			Aircrafts.status AS aircraft_status,
			Aircrafts.id AS aircraft_id,
			Pilots.name AS pilot_name,
			Pilots.age AS pilot_age,
			Pilots.experience_years AS pilot_experience_years
		FROM 
			Flights
		JOIN 
			Aircrafts ON Flights.aircraft_id = Aircrafts.id
		JOIN 
			Pilots ON Flights.pilot_id = Pilots.id`,
		(err, results) => {
			if (err) {
				console.error("Error getting flights:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			res.status(200).json(results)
		}
	)
}

// Get a specific Flight by id with aircraft details
exports.getOne = (req, res) => {
	const id = req.params.id
	db.query(
		` SELECT 
			Flights.flight_number AS flight_number,
			Flights.departure_airport AS departure_airport,
			Flights.departure_datetime AS departure_datetime,
			Flights.arrival_airport AS arrival_airport,
			Flights.arrival_datetime AS arrival_datetime,
			Flights.aircraft_id AS flight_aircraft_id,
			Flights.pilot_id AS flight_pilot_id,
			Flights.co_pilot_id AS co_pilot_id,
			Flights.crew_members AS crew_members,
			Flights.passengers AS passengers,
			Flights.status AS flight_status,
			Aircrafts.registration_number AS aircraft_registration_number,
			Aircrafts.manufacturer AS aircraft_manufacturer,
			Aircrafts.model AS aircraft_model,
			Aircrafts.year_of_manufacture AS aircraft_year_of_manufacture,
			Aircrafts.capacity AS aircraft_capacity,
			Aircrafts.fuel_capacity AS aircraft_fuel_capacity,
			Aircrafts.max_speed AS aircraft_max_speed,
			Aircrafts.max_range AS aircraft_max_range,
			Aircrafts.current_location AS aircraft_current_location,
			Aircrafts.status AS aircraft_status,
			Pilots.name AS pilot_name,
			Pilots.age AS pilot_age,
			Pilots.experience_years AS pilot_experience_years
		FROM 
			Flights
		JOIN 
			Aircrafts ON Flights.aircraft_id = Aircrafts.id
		JOIN 
			Pilots ON Flights.pilot_id = Pilots.id
		WHERE Flight.id = ? `,
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
		res.status(200).json({ message: "Flight deleted successfully" })
	})
}
