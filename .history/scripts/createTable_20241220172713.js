const mysql = require('mysql2');

// Step 1: Create a connection to MySQL
const connection = mysql.createConnection({
  host: 'localhost',        // Change if your MySQL is hosted elsewhere
  user: 'root',             // Your MySQL username
  password: 'root',  // Your MySQL password
  database: 'url_shortener_db', // Database name
  multipleStatements: true  // To execute multiple SQL statements at once
});

// Step 2: Create the database, table, and insert data
const sql = `
CREATE DATABASE IF NOT EXISTS url_shortener_db;
USE url_shortener_db;

CREATE TABLE IF NOT EXISTS url_shortener (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_url VARCHAR(2083) NOT NULL,
    short_code VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO url_shortener (original_url, short_code)
VALUES 
    ('https://example.com/long-url-1', 'short1'),
    ('https://example.com/long-url-2', 'short2'),
    ('https://example.com/long-url-3', 'short3'),
    ('https://example.com/long-url-4', 'short4'),
    ('https://example.com/long-url-5', 'short5');
`;

// Step 3: Execute the SQL query
connection.query(sql, (err, results) => {
  if (err) {
    console.error('Error executing SQL:', err.message);
    return;
  }
  console.log('Database and table created. Sample data inserted.');
});

// Step 4: Fetch the data to verify
connection.query('SELECT * FROM url_shortener', (err, results) => {
  if (err) {
    console.error('Error fetching data:', err.message);
    return;
  }
  console.log('Fetched data:', results);
});

// Step 5: End the connection
connection.end();
