const mysql = require('mysql2');

const dbConfig = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'url_shortener_db', // Replace with your database name
});

dbConfig.connect((err) => {
  if (err) throw err;
  console.log('Database connected successfully!');
});

module.exports = dbConfig;
