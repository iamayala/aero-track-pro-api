
const db = require("./_index")
const bcrypt = require("bcrypt")


exports.create = async (req, res) => {
  try {
    const { username, password, email, role, full_name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email already exists
    db.query('SELECT * FROM Users WHERE email = ?', [email], (err,  result) => {
      if(err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (result.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    });

    db.query('INSERT INTO Users (username, password, email, role, full_name) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, email, role, full_name], (err,result) => {
        if (err) {
          return res.status(500).json({ message: 'Internal server error' });
        }
        res.json({ id: result.insertId, username, email, role, full_name });
      })

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: '!Internal server error' });
  }
}

exports.get  =  async (req, res) => {
  try {
    db.query('SELECT * FROM Users WHERE status = true', (err, users) => {
      if(err) {
        return res.status(500).json({message: 'Internal server error'});
      }
      res.json(users);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

exports.getOne = async (req, res) => {
  try {
    db.query('SELECT * FROM Users WHERE id = ?', [req.params.id], (err, user) => {
      if(err) {
        return res.status(500).json({ message: 'Internal server error --> ' +  err.message });
      }
      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user[0]);
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.put   = async (req, res) => {
  try {
    const { username, email, role, full_name } = req.body;

    db.query('SELECT * FROM Users WHERE id = ?', [req.params.id], (err, existingUser) => {
      if(err) {
        return res.status(500).json({ message: 'Internal server error --> ' + err.message });
      }

      if (existingUser.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if email already exists for another user
      db.query('SELECT * FROM Users WHERE email = ? AND id != ?', [email, req.params.id], (err, otherUserWithEmail) => {
        if(err) {
          return res.status(500).json({ message: 'Internal server error --> ' + err.message });
        }

        if (otherUserWithEmail.length > 0) {
          return res.status(400).json({ message: 'Email already exists' });
        }

        db.query(
          'UPDATE Users SET username = ?, email = ?, role = ?, full_name = ? WHERE id = ?',
          [username, email, role, full_name, req.params.id],
          (err, result ) => {
            if(err) {
              return res.status(500).json({ message: 'Internal server error --> ' + err.message });
            }
            return res.json({ id: req.params.id, username, email, role, full_name });
          }
        );

      });

    });

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.delete =  async (req, res) => {
  try {
     db.query('SELECT * FROM Users WHERE id = ?', [req.params.id], (err,existingUser) => {
       if(err) {
         return res.status(500).json({ message: 'Internal server error' });
       }
       if (existingUser.length === 0) {
         return res.status(404).json({ message: 'User not found' });
       } else  {
         db.query('UPDATE Users SET status = false WHERE id = ?', [req.params.id],(err, result) => {
           if(err) {
             return res.status(500).json({ message: 'Internal server error' });
           }
           return res.json({ message: 'User deleted successfully' });
         })
       }
     });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


