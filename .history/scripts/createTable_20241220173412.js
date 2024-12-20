const db = require('../config/database');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS url_shortner (
   id INT AUTO_INCREMENT PRIMARY KEY,
   long_url VARCHAR(2083) NOT NULL,
   short_url VARCHAR(50) NOT NULL UNIQUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const insertDataQuery = `
INSERT INTO url_shortner (long_url, short_url)
VALUES
    ('https://marketplace.com/home-page', 'home-page'),
    ('https://marketplace/cart-page', 'cart-page'),
    ('https://marketplace/catalogue-page', 'catalogue-page'),
    ('https://marketplace/product-page', 'product-page'),
    ('https://marketplace/payment-page', 'payment-page');
`;

// Step 1: Create the table
db.query(createTableQuery, (err, results) => {
  if (err) {
    console.error(`Error creating table: ${err.message}`);
    return;
  }
  console.log(`Table created successfully!`);

  // Step 2: Insert sample data
  db.query(insertDataQuery, (err, results) => {
    if (err) {
      console.error(`Error inserting data: ${err.message}`);
      return;
    }
    console.log(`Sample data inserted successfully!`);

    // Step 3: Fetch the data to verify
    db.query('SELECT * FROM url_shortner', (err, results) => {
      if (err) {
        console.error(`Error fetching data: ${err.message}`);
        return;
      }
      console.log('Fetched data:', results);

      // End the connection
      db.end();
    });
  });
});
