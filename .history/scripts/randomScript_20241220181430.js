const mysql = require('mysql2');

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Replace with your MySQL password
  database: 'url_shortener_db', // Replace with your database name
});

// Function to generate random URLs
function generateRandomURL() {
  const randomString = Math.random().toString(36).substring(2, 10);
  return {
    long_url: `ttps://swap.notion.site/Swapnil-s-Library-996716516a3740e9b31d544cbc53ef0b/${randomString}`,
    short_url: randomString,
  };
}

// Insert 1000 rows
async function insertRows() {
  console.log('Starting to insert rows...');
  
  const values = [];
  
  // Generate 1000 rows of data
  for (let i = 0; i < 1000; i++) {
    const { long_url, short_url } = generateRandomURL();
    values.push([long_url, short_url]);
  }

  // SQL Query to insert multiple rows at once
  const insertQuery = `
    INSERT INTO url_shortner (long_url, short_url) VALUES ?
  `;

  // Execute the query
  db.query(insertQuery, [values], (err, results) => {
    if (err) {
      console.error(`Error inserting rows: ${err.message}`);
      return;
    }
    console.log(`Successfully inserted ${results.affectedRows} rows!`);
    db.end(); // Close the database connection
  });
}

// Start the insertion
insertRows();
// Query to fetch table size
const tableSizeQuery = `
  SELECT 
      table_schema AS database_name,
      table_name,
      ROUND(data_length / 1024, 2) AS data_size_kb,
      ROUND(index_length / 1024, 2) AS index_size_kb,
      ROUND((data_length + index_length) / 1024, 2) AS total_size_kb
  FROM 
      information_schema.tables
  WHERE 
      table_name = 'url_shortner' 
      AND table_schema = 'url_shortener_db'; -- Replace with your database name
`;

// Execute the query
db.query(tableSizeQuery, (err, results) => {
  if (err) {
    console.error(`Error fetching table size: ${err.message}`);
    return;
  }
  console.log(`Table Size Information:`, results);
  db.end(); // Close the database connection
});
