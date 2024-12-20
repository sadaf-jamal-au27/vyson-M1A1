const db = require('../config/database')

const createDataQuery = `
CREATE TABLE IF NOT EXISTS url_shortner (
   id INT AUTO_INCREMENT PRIMARY KEY,
   long_url VARCHAR(2083) NOT NULL,
   short_url VARCHAR(50) NOT NULL UNIQUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)    
`;
db.query(createDataQuery,(err) => {
    if (err) throw err;
    console.log(`Table created successfully!!1`);
    db.end()
    
})