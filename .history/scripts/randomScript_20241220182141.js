const mysql = require('mysql2');

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Replace with your MySQL password
  database: 'url_shortener_db', // Replace with your database name
});

// Insert 1000 rows
const insertRows = () => {
  console.log('Starting to insert rows...');

  const insertQuery = `
    INSERT INTO url_shortner (long_url, short_url)
    VALUES (?, ?)
  `;

  const rows = [];
  for (let i = 1; i <= 1000000; i++) {
    rows.push([
      `https://example.com/page-${i}`,
      `page-${i}`,
    ]);
  }

  db.beginTransaction((err) => {
    if (err) throw err;

    const insertPromises = rows.map((row) =>
      new Promise((resolve, reject) => {
        db.query(insertQuery, row, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      })
    );

    Promise.all(insertPromises)
      .then(() => {
        db.commit((err) => {
          if (err) {
            db.rollback(() => console.error('Transaction failed, rollback executed.', err));
          } else {
            console.log('Successfully inserted 1000 rows!');
          }

          // Fetch table size
          fetchTableSize();
        });
      })
      .catch((err) => {
        db.rollback(() => {
          console.error('Error inserting rows, rollback executed.', err);
        });
      });
  });
};

// Fetch table size
const fetchTableSize = () => {
  const sizeQuery = `
    SELECT 
        TABLE_NAME,
        ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024, 2) AS table_size_kb,
        ROUND((DATA_LENGTH) / 1024, 2) AS data_size_kb,
        ROUND((INDEX_LENGTH) / 1024, 2) AS index_size_kb
    FROM 
        INFORMATION_SCHEMA.TABLES
    WHERE 
        TABLE_SCHEMA = 'url_shortener_db' -- Replace with your database name
        AND TABLE_NAME = 'url_shortner';
  `;

  db.query(sizeQuery, (err, results) => {
    if (err) {
      console.error('Error fetching table size:', err);
    } else {
      console.log('Table size details:', results);
    }

    // End the database connection after all queries are complete
    db.end((err) => {
      if (err) console.error('Error closing the connection:', err);
      else console.log('Database connection closed.');
    });
  });
};

// Start the process
insertRows();
