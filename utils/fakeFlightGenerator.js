const cron = require("node-cron")
const moment = require("moment")
const db = require("../src/controllers/_index")

const createFlight = () => {
	// Simulate flight data
	const flight_number = generateFlightNumber()
	const departure_airport = "Airport A"
	const arrival_airport = "Airport B"
	const departure_datetime = moment().format("YYYY-MM-DD HH:mm:ss")
	const arrival_datetime = moment().add(4, "hours").format("YYYY-MM-DD HH:mm:ss") // Simulating 4-hour flight duration
	const aircraft_id = generateAircraftId()
	let pilot_id

	// Query to select an available pilot who is not already assigned to another flight
	const selectAvailablePilotQuery = `
        SELECT id FROM Pilots WHERE id NOT IN (
            SELECT pilot_id FROM Flights WHERE status != 'completed'
        ) ORDER BY RAND() LIMIT 1;
    `

	// Execute the query to select an available pilot
	db.query(selectAvailablePilotQuery, (selectErr, selectResults) => {
		if (selectErr) {
			console.error("Error selecting available pilot:", selectErr)
			return
		}

		if (selectResults.length === 0) {
			console.log("No available pilots found.")
			return
		}

		pilot_id = selectResults[0].id

		// Insert the flight data into the database
		db.query(
			"INSERT INTO Flights (flight_number, departure_airport, departure_datetime, arrival_airport, arrival_datetime, aircraft_id, pilot_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			[
				flight_number,
				departure_airport,
				departure_datetime,
				arrival_airport,
				arrival_datetime,
				aircraft_id,
				pilot_id,
				"scheduled",
			],
			(err, result) => {
				if (err) {
					console.error("Error creating flight:", err)
					return
				}
				console.log("Flight created successfully")
			}
		)
	})
}

const endFlights = () => {
	const now = moment().format("YYYY-MM-DD HH:mm:ss")

	// Query to update flights that have reached their arrival time
	const updateFlightsQuery = `
        UPDATE Flights
        SET status = 'completed'
        WHERE status != 'completed' AND arrival_datetime <= ?;
    `

	db.query(updateFlightsQuery, [now], (err, result) => {
		if (err) {
			console.error("Error ending flights:", err)
			return
		}
		console.log(`${result.affectedRows} flights ended successfully`)
	})
}

const updateAircraftData = () => {
	// Select a random aircraft ID from completed flights
	const selectRandomAircraftQuery = `
        SELECT aircraft_id FROM Flights WHERE status = 'completed' ORDER BY RAND() LIMIT 1
    `

	db.query(selectRandomAircraftQuery, (selectErr, selectResults) => {
		if (selectErr) {
			console.error("Error selecting random aircraft:", selectErr)
			return
		}

		if (selectResults.length === 0) {
			console.log("No completed flights found.")
			return
		}

		const aircraft_id = selectResults[0].aircraft_id

		// Update the selected aircraft's data
		db.query(
			"UPDATE Aircrafts SET fuel_capacity = ?, max_range = ?, max_speed = ?, current_location = ? WHERE id = ?",
			[
				calculateFuelConsumption(),
				calculateMaxRange(),
				calculateMaxSpeed(),
				"Airport B",
				aircraft_id,
			],
			(updateErr, updateResult) => {
				if (updateErr) {
					console.error("Error updating aircraft data:", updateErr)
					return
				}
				console.log("Aircraft data updated successfully")
			}
		)
	})
}
// Function to generate a random flight number
const generateFlightNumber = () => {
	return "FL" + Math.floor(Math.random() * 10000)
}

// Function to generate a random aircraft ID (for demonstration purposes)
const generateAircraftId = () => {
	return Math.floor(Math.random() * 5) // Assuming aircraft IDs are integers
}

// Function to calculate random fuel consumption
const calculateFuelConsumption = () => {
	return Math.floor(Math.random() * 10000) // Simulating fuel consumption in liters
}

// Function to calculate random max range
const calculateMaxRange = () => {
	return Math.floor(Math.random() * 5000) // Simulating max range in kilometers
}

// Function to calculate random max speed
const calculateMaxSpeed = () => {
	return Math.floor(Math.random() * 1000) // Simulating max speed in kilometers per hour
}

module.exports = { createFlight, updateAircraftData, endFlights }
