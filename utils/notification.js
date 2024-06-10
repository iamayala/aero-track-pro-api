const generateNotifications = () => {
	// 1. Notifications for maintenance activities due in 10 minutes
	const maintenanceNotificationQuery = `
        INSERT INTO Notifications (type, message)
        SELECT 'maintenance', CONCAT('Maintenance activity with ID ', id, ' is due in 10 minutes.') AS message
        FROM MaintenanceActivities
        WHERE TIMESTAMPDIFF(MINUTE, NOW(), due_date) = 10;
    `

	// 2. Notifications for automatic order placement
	const orderNotificationQuery = `
        INSERT INTO Notifications (type, message)
        SELECT 'order', 'A new order has been automatically placed for part ID ' || part_id || ' due to low quantity.' AS message
        FROM Orders
        WHERE status = 'pending';
    `

	// 3. Notifications for completion of maintenance activities
	const maintenanceCompletionNotificationQuery = `
        INSERT INTO Notifications (type, message)
        SELECT 'maintenance', CONCAT('Maintenance activity with ID ', id, ' has been completed.') AS message
        FROM MaintenanceActivities
        WHERE status = 'completed';
    `

	// 4. Notifications for creation of flights
	const flightNotificationQuery = `
        INSERT INTO Notifications (type, message)
        SELECT 'flight', 'A new flight has been created with ID ' || id AS message
        FROM Flights;
    `

	// Execute the notification queries
	db.query(maintenanceNotificationQuery, (err, result) => {
		if (err) {
			console.error("Error generating maintenance notifications:", err)
		}
	})

	db.query(orderNotificationQuery, (err, result) => {
		if (err) {
			console.error("Error generating order notifications:", err)
		}
	})

	db.query(maintenanceCompletionNotificationQuery, (err, result) => {
		if (err) {
			console.error("Error generating maintenance completion notifications:", err)
		}
	})

	db.query(flightNotificationQuery, (err, result) => {
		if (err) {
			console.error("Error generating flight notifications:", err)
		}
	})
}

module.exports = generateNotifications
