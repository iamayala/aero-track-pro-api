const db = require("./_index")
const bcrypt = require("bcrypt")

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM Users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (!isMatch) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      delete user.password;

      res.status(200).json({ message: 'Login successful', user });
    });
  });
}

exports.updatePassword = (req, res) => {
  const { id,currentPassword, newPassword } = req.body;

  if (!id) {
    res.status(401).json({ error: 'Missing user id' });
    return;
  }

  db.query('SELECT * FROM Users WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = results[0];

    bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (!isMatch) {
        res.status(401).json({ error: 'Current pin is incorrect' });
        return;
      }

      bcrypt.hash(newPassword, 10, (hashError, hashedPassword) => {
        if (hashError) {
          console.error('Error hashing pin:', hashError);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        db.query('UPDATE Users SET password = ? WHERE id = ?', [hashedPassword, id], (updateError, updateResults) => {
          if (updateError) {
            console.error('Error updating pin:', updateError);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }

          res.status(200).json({ message: 'Password updated successfully' });
        });
      });
    });
  });
};
