const moment = require("moment")
const db = require("../src/controllers/_index")

// Arrays of possible values
const reportTypes = [
	"Routine Inspection",
	"Emergency Check",
	"Scheduled Maintenance",
	"Unscheduled Maintenance",
]
const descriptions = [
	"Routine compliance check performed.",
	"Emergency inspection conducted due to unexpected issue.",
	"Scheduled maintenance as per maintenance plan.",
	"Unscheduled maintenance due to reported anomaly.",
]
const findingsOptions = [
	"No issues found.",
	"Minor issues detected.",
	"Major issues detected.",
	"System requires immediate attention.",
]
const correctiveActionsOptions = [
	"None required.",
	"Minor adjustments made.",
	"Major repairs performed.",
	"Aircraft grounded for further inspection.",
]

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)]

const insertComplianceReport = () => {
	// Query to select a random available aircraft ID
	const selectRandomAircraftQuery = "SELECT id FROM Aircrafts ORDER BY RAND() LIMIT 1"

	db.query(selectRandomAircraftQuery, (err, results) => {
		if (err) {
			console.error("Error selecting random aircraft:", err)
			return
		}

		if (results.length === 0) {
			console.log("No available aircraft found.")
			return
		}

		const aircraft_id = results[0].id
		const report_date = moment().format("YYYY-MM-DD HH:mm:ss")
		const report_type = getRandomElement(reportTypes)
		const description = getRandomElement(descriptions)
		const findings = getRandomElement(findingsOptions)
		const corrective_actions = getRandomElement(correctiveActionsOptions)

		const insertReportQuery = `
      INSERT INTO ComplianceReports 
      (aircraft_id, report_date, report_type, description, findings, corrective_actions) 
      VALUES (?, ?, ?, ?, ?, ?)
    `

		db.query(
			insertReportQuery,
			[aircraft_id, report_date, report_type, description, findings, corrective_actions],
			(insertErr, result) => {
				if (insertErr) {
					console.error("Error inserting compliance report:", insertErr)
					return
				}
				console.log("Compliance report added successfully.")
			}
		)
	})
}

module.exports = { insertComplianceReport }
