const moment = require("moment")
const db = require("../src/controllers/_index")

const addMaintenanceReminders = () => {
	const tenMinutesFromNow = moment().add(10, "minutes").format("YYYY-MM-DD HH:mm:ss")
	const timeNow = moment().format("YYYY-MM-DD HH:mm:ss")

	const query = `
        SELECT id, activity_type, start_datetime 
        FROM MaintenanceActivities 
        WHERE start_datetime BETWEEN  ? AND ? AND status != 'completed';
    `

	db.query(query, [timeNow, tenMinutesFromNow], (err, results) => {
		if (err) {
			console.error("Error fetching due maintenance activities:", err)
			return
		}

		results.forEach((activity) => {
			const message = `${activity.activity_type} is due at ${activity.start_datetime}`
			const timestamp = activity.start_datetime

			// Check if the notification already exists
			const checkQuery = `
                SELECT COUNT(*) AS count 
                FROM Notifications 
                WHERE message = ? AND timestamp = ?;
            `

			db.query(checkQuery, [message, timestamp], (checkErr, checkResult) => {
				if (checkErr) {
					console.error("Error checking existing notifications:", checkErr)
					return
				}

				if (checkResult[0].count === 0) {
					// Insert the notification if it doesn't already exist
					const insertQuery = `
                        INSERT INTO Notifications (message, timestamp) 
                        VALUES (?, ?);
                    `

					db.query(insertQuery, [message, timestamp], (insertErr) => {
						if (insertErr) {
							console.error("Error adding notification:", insertErr)
						} else {
							console.log("Notification added successfully")
						}
					})
				}
			})
		})
	})
}

// Function to delete past reminders from the Notifications table
const deletePastReminders = () => {
	const currentTime = moment().format("YYYY-MM-DD HH:mm:ss")

	const query = `
        DELETE FROM Notifications 
        WHERE timestamp < ?;
    `

	db.query(query, [currentTime], (err, result) => {
		if (err) {
			console.error("Error deleting past notifications:", err)
		} else {
			console.log(`Deleted ${result.affectedRows} past notifications`)
		}
	})
}

module.exports = { addMaintenanceReminders, deletePastReminders }
