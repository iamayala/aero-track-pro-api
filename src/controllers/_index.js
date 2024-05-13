const mysql = require("mysql2");

var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/db.config.js")[env];

var connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  // console.log("Connected to database successfully.");

  // Execute a test query to verify the connection
  connection.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      console.error("Error executing test query:", err);
    }
    // console.log("Test query result:", results[0].result);
  });
});

module.exports = connection;
