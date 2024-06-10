const db = require("./_index")
const moment = require("moment")

exports.getFlightsOfCurrentWeek = async (req, res) => {
	const startOfWeek = moment().startOf("isoWeek").format("YYYY-MM-DD HH:mm:ss")
	const endOfWeek = moment().endOf("isoWeek").format("YYYY-MM-DD HH:mm:ss")

	db.query(
		"SELECT * FROM Flights WHERE arrival_datetime BETWEEN ? AND ? AND status = 'completed'",
		[startOfWeek, endOfWeek],
		(err, results) => {
			if (err) {
				console.error("Error getting flights:", err)
				return res.status(500).json({ message: "Internal server error" })
			}
			// Initialize an array with 7 elements for each day of the week
			const flightsByDay = { Mo: [], Tu: [], We: [], Th: [], Fr: [], Sa: [], Su: [] }
			const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

			// Iterate through the flights and group them by day of the week
			results.forEach((flight) => {
				const dayOfWeek = moment(flight.arrival_datetime).format("dd") // Get day of the week in short format (e.g., 'Mo')
				if (flightsByDay[dayOfWeek]) {
					flightsByDay[dayOfWeek].push(flight)
				}
			})

			// // Convert the object to an array in the order of the daysOfWeek array
			const flightsArray = daysOfWeek.map((day) => flightsByDay[day].length)

			res.status(200).json(flightsArray)
		}
	)
}

exports.getMaintenanceActivities = async (req, res) => {
	// Get the start and end of the current week
	const startOfWeek = moment().startOf("isoWeek").format("YYYY-MM-DD HH:mm:ss")
	const endOfWeek = moment().endOf("isoWeek").format("YYYY-MM-DD HH:mm:ss")

	// Query to get maintenance activities within the current year grouped by month
	const monthlyQuery = `
      SELECT 
        EXTRACT(MONTH FROM updated_at) AS month, 
        COUNT(*) AS count 
      FROM MaintenanceActivities 
      WHERE status = 'completed' 
      AND EXTRACT(YEAR FROM updated_at) = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY month 
      ORDER BY month;
    `

	// Query to get maintenance activities within the current week
	const weeklyQuery = `
        SELECT 
            CASE 
                WHEN DAYOFWEEK(updated_at) = 1 THEN 7 
                ELSE DAYOFWEEK(updated_at) - 1 
            END AS day_of_week, 
            COUNT(*) AS count 
        FROM MaintenanceActivities 
        WHERE status = 'completed' 
        AND updated_at BETWEEN ? AND ?
        GROUP BY day_of_week 
        ORDER BY day_of_week;
    `

	// Execute the monthly query
	db.query(monthlyQuery, (err, monthlyResult) => {
		if (err) {
			console.error("Error getting flights:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		db.query(weeklyQuery, [startOfWeek, endOfWeek], (err, weeklyResult) => {
			if (err) {
				console.error("Error getting flights:", err)
				return res.status(500).json({ message: "Internal server error" })
			}

			// Initialize arrays for monthly and weekly counts
			const monthlyCounts = new Array(12).fill(0)
			const weeklyCounts = new Array(7).fill(0)

			monthlyResult.forEach((row) => {
				monthlyCounts[row.month - 1] = parseInt(row.count, 10)
			})

			weeklyResult.forEach((row) => {
				const dayOfWeek = row.day_of_week === 0 ? 6 : row.day_of_week - 1
				weeklyCounts[dayOfWeek] = parseInt(row.count, 10)
			})

			const response = {
				month: monthlyCounts,
				week: weeklyCounts,
			}

			res.status(200).json(response)
		})
	})
}

exports.getResponseTimePercentage = async (req, res) => {
	const responseTimeQuery = `
      SELECT
        TIMESTAMPDIFF(MINUTE, created_at, updated_at) AS response_time_minutes
      FROM
        MaintenanceActivities
      WHERE
        status = 'completed';
    `

	// Execute the query
	db.query(responseTimeQuery, (err, result) => {
		if (err) {
			console.error("Error getting flights:", err)
			return res.status(500).json({ message: "Internal server error" })
		}

		// Calculate the total and average response time
		let totalResponseTime = 0
		result.forEach((row) => {
			totalResponseTime += row.response_time_minutes
		})

		// Calculate the average response time
		const averageResponseTime = (totalResponseTime / result.length).toFixed(2)

		// Calculate the percentage of the response time compared to a standard time (e.g., 60 minutes)
		const standardTime = 60 // This is an arbitrary standard time you can define
		const responseTimePercentage = ((averageResponseTime / standardTime) * 100).toFixed(2)

		// Response object
		const response = {
			averageResponseTime,
			responseTimePercentage,
		}

		res.status(200).json(response)
	})
}

exports.getAveragePriority = (req, res) => {
	// Query to get the average priority
	const priorityQuery = `
      SELECT AVG(priority) AS average_priority
      FROM MaintenanceActivities;
    `

	// Execute the query
	db.query(priorityQuery, (err, result) => {
		if (err) {
			console.error("Error getting flights:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		// Get the average priority value
		const averagePriority = parseFloat(result[0].average_priority)

		// Map the average priority to the corresponding metric
		let priorityMetric
		if (averagePriority <= 1.5) {
			priorityMetric = "high"
		} else if (averagePriority <= 2.5) {
			priorityMetric = "medium"
		} else if (averagePriority <= 3.5) {
			priorityMetric = "low"
		} else {
			priorityMetric = "no risk"
		}

		// Response object
		const response = {
			averageRisk: averagePriority.toFixed(2), // Keeping two decimal points for clarity
			priorityMetric,
		}

		res.status(200).json(response)
	})
}

exports.getAveragePriorityPerMonth = (req, res) => {
	const priorityQuery = `
      SELECT
        MONTH(updated_at) AS month,
        AVG(priority) AS average_priority
      FROM
        MaintenanceActivities
      GROUP BY
        MONTH(updated_at)
      ORDER BY
        month;
    `

	// Execute the query
	db.query(priorityQuery, (err, results) => {
		if (err) {
			console.error("Error getting flights:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		// Initialize an array for monthly average priorities
		const monthlyPriorities = new Array(12).fill(0)

		// Populate the monthly priorities array
		results.forEach((row) => {
			monthlyPriorities[row.month - 1] = parseFloat(row.average_priority)
		})

		// Response object
		const response = {
			monthlyPriorities,
		}

		res.json(response)
	})
}

exports.getMetrics = (req, res) => {
	// SQL queries to get the required metrics
	const ongoingFlightsQuery = `
        SELECT COUNT(*) AS ongoingFlights FROM Flights WHERE status != 'completed';
    `
	const ordersPlacedQuery = `
        SELECT COUNT(*) AS ordersPlaced FROM Orders;
    `
	const ongoingAndPendingMaintenanceQuery = `
        SELECT COUNT(*) AS ongoingAndPendingMaintenance FROM MaintenanceActivities WHERE status IN ('scheduled', 'in_progress');
    `
	const aircraftInDangerQuery = `
        SELECT COUNT(*) AS aircraftInDanger FROM Aircrafts WHERE fuel_capacity < 100;
    `

	// Execute all queries and return the results
	Promise.all([
		new Promise((resolve, reject) => {
			db.query(ongoingFlightsQuery, (err, results) => {
				if (err) {
					return reject(err)
				}
				resolve(results[0].ongoingFlights)
			})
		}),
		new Promise((resolve, reject) => {
			db.query(ordersPlacedQuery, (err, results) => {
				if (err) {
					return reject(err)
				}
				resolve(results[0].ordersPlaced)
			})
		}),
		new Promise((resolve, reject) => {
			db.query(ongoingAndPendingMaintenanceQuery, (err, results) => {
				if (err) {
					return reject(err)
				}
				resolve(results[0].ongoingAndPendingMaintenance)
			})
		}),
		new Promise((resolve, reject) => {
			db.query(aircraftInDangerQuery, (err, results) => {
				if (err) {
					return reject(err)
				}
				resolve(results[0].aircraftInDanger)
			})
		}),
	])
		.then(([ongoingFlights, ordersPlaced, ongoingAndPendingMaintenance, aircraftInDanger]) => {
			res.status(200).json({
				ongoingFlights,
				ordersPlaced,
				ongoingAndPendingMaintenance,
				aircraftInDanger,
			})
		})
		.catch((err) => {
			console.error("Error fetching metrics:", err)
			res.status(500).json({ message: "Internal server error" })
		})
}
