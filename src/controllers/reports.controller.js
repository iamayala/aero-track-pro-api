const db = require("./_index")

exports.getComplianceReports = (req, res) => {
	const query = `
    SELECT 
      ComplianceReports.report_id AS report_id,
      ComplianceReports.aircraft_id,
      ComplianceReports.report_date,
      ComplianceReports.report_type,
      ComplianceReports.description,
      ComplianceReports.findings,
      ComplianceReports.corrective_actions,
      Aircrafts.registration_number,
      Aircrafts.manufacturer,
      Aircrafts.model,
      Aircrafts.year_of_manufacture,
      Aircrafts.capacity,
      Aircrafts.fuel_capacity,
      Aircrafts.max_speed,
      Aircrafts.max_range,
      Aircrafts.current_location,
      Aircrafts.status AS aircraft_status
    FROM 
      ComplianceReports
    JOIN 
      Aircrafts ON ComplianceReports.aircraft_id = Aircrafts.id
  `

	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching compliance reports:", err)
			return res.status(500).json({ message: "Internal server error" })
		}
		res.status(200).json(results)
	})
}
