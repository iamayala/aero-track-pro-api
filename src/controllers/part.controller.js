const db = require("./_index")

 exports.post =  async (req, res) => {
  try {
    const { part_number, part_name, manufacturer, description, unit_price, quantity, location, status } = req.body;

    // Insert part into the database
    db.query(
      'INSERT INTO Parts (part_number, part_name, manufacturer, description, unit_price, quantity, location, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [part_number, part_name, manufacturer, description, unit_price, quantity, location, status],
      (err, result) => {
        if (err) {
          console.error('Error inserting part:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ id: result.insertId, part_number, part_name, manufacturer, description, unit_price, quantity, location, status });
      }
    );
  } catch (error) {
    console.error('Error creating part:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all parts
exports.get  = (req, res) => {
  db.query('SELECT * FROM Parts', (err, results) => {
    if (err) {
      console.error('Error getting parts:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
};

// Get a specific part by id
exports.getOne = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Parts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error getting part:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }
    res.json(results[0]);
  });
};

// Update a part
exports.put= (req, res) => {
  const id = req.params.id;
  const { part_number, part_name, manufacturer, description, unit_price, quantity, location, status } = req.body;
  db.query(
    'UPDATE Parts SET part_number=?, part_name=?, manufacturer=?, description=?, unit_price=?, quantity=?, location=?, status=? WHERE id=?',
    [part_number, part_name, manufacturer, description, unit_price, quantity, location, status, id],
    (err, result) => {
      if (err) {
        console.error('Error updating part:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Part not found' });
      }
      res.json({ id, part_number, part_name, manufacturer, description, unit_price, quantity, location, status });
    }
  );
};

// Delete a part
exports.delete  =  (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Parts WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting part:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }
    res.json({ message: 'Part deleted successfully' });
  });
};