const db = require("./_index")

exports.post = (req, res) => {
  const {
    activity_type,
    activity_description,
    aircraft_id,
    technician_id,
    start_datetime,
    end_datetime,
    parts_replaced,
    issues_resolved,
    status
  } = req.body;

  db.query(
    `INSERT INTO MaintenanceActivities 
     (activity_type, activity_description, aircraft_id, technician_id, start_datetime, end_datetime, parts_replaced, issues_resolved, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [activity_type, activity_description, aircraft_id, technician_id, start_datetime, end_datetime, JSON.stringify(parts_replaced), issues_resolved, status],
    (err, result) => {
      if (err) {
        console.error('Error creating maintenance activity:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json({
        id: result.insertId,
        activity_type,
        activity_description,
        aircraft_id,
        technician_id,
        start_datetime,
        end_datetime,
        parts_replaced,
        issues_resolved,
        status
      });
    }
  );
};

exports.get = (req, res) => {
  db.query(`
    SELECT MA.*, 
           AC.id AS aircraft_id, AC.manufacturer AS aircraft_manufacturer, AC.model AS aircraft_model, AC.registration_number, 
           CONCAT('technician', UT.id) AS technician_id, UT.full_name AS technician_name, UT.email AS technician_email
    FROM MaintenanceActivities MA
    JOIN Aircrafts AC ON MA.aircraft_id = AC.id
    JOIN Users UT ON MA.technician_id = UT.id
  `,
    (err, results) => {
      if (err) {
        console.error('Error fetching maintenance activities:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(results);
    });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  db.query(`
    SELECT MA.*, 
           AC.id AS aircraft_id, AC.manufacturer AS aircraft_manufacturer, AC.model AS aircraft_model, AC.registration_number, 
           CONCAT('technician', UT.id) AS technician_id, UT.full_name AS technician_name, UT.email AS technician_email
    FROM MaintenanceActivities MA
    JOIN Aircrafts AC ON MA.aircraft_id = AC.id
    LEFT JOIN Users UT ON MA.technician_id = UT.id
    WHERE MA.id = ?
  `, [id],
    (err, results) => {
      if (err) {
        console.error('Error fetching maintenance activities:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(results[0]);
    });
};

exports.getByTechnicianId = (req, res) => {
  const id = req.params.id;
  db.query(`
    SELECT MA.*, 
           AC.id AS aircraft_id, AC.manufacturer AS aircraft_manufacturer, AC.model AS aircraft_model, AC.registration_number, 
           CONCAT('technician', UT.id) AS technician_id, UT.full_name AS technician_name, UT.email AS technician_email
    FROM MaintenanceActivities MA
    JOIN Aircrafts AC ON MA.aircraft_id = AC.id
    LEFT JOIN Users UT ON MA.technician_id = UT.id
    WHERE UT.id = ?
  `, [id],
    (err, results) => {
      if (err) {
        console.error('Error fetching maintenance activities:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(results);
    });
};

exports.getByAircraftId = (req, res) => {
  const id = req.params.id;
  db.query(`
    SELECT MA.*, 
           AC.id AS aircraft_id, AC.manufacturer AS aircraft_manufacturer, AC.model AS aircraft_model, AC.registration_number, 
           CONCAT('technician', UT.id) AS technician_id, UT.full_name AS technician_name, UT.email AS technician_email
    FROM MaintenanceActivities MA
    JOIN Aircrafts AC ON MA.aircraft_id = AC.id
    LEFT JOIN Users UT ON MA.technician_id = UT.id
    WHERE AC.id = ?
  `, [id],
    (err, results) => {
      if (err) {
        console.error('Error fetching maintenance activities:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(results);
    });
};

exports.put = (req, res) => {
  const activityId = req.params.id;
  const {
    activity_type,
    activity_description,
    aircraft_id,
    technician_id,
    start_datetime,
    end_datetime,
    parts_replaced,
    issues_resolved,
    status
  } = req.body;

  db.query(
    `UPDATE MaintenanceActivities
     SET activity_type = ?, activity_description = ?, aircraft_id = ?, technician_id = ?, start_datetime = ?, end_datetime = ?, parts_replaced = ?, issues_resolved = ?, status = ?
     WHERE id = ?`,
    [activity_type, activity_description, aircraft_id, technician_id, start_datetime, end_datetime, JSON.stringify(parts_replaced), issues_resolved, status, activityId],
    (err) => {
      if (err) {
        console.error('Error updating maintenance activity:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json({
        id: activityId,
        activity_type,
        activity_description,
        aircraft_id,
        technician_id,
        start_datetime,
        end_datetime,
        parts_replaced,
        issues_resolved,
        status
      });
    }
  );
};

exports.delete = (req, res) => {
  const activityId = req.params.id;

  db.query(
    'DELETE FROM MaintenanceActivities WHERE id = ?',
    [activityId],
    (err) => {
      if (err) {
        console.error('Error deleting maintenance activity:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json({ id: activityId, message: 'Maintenance activity deleted successfully' });
    }
  );
};