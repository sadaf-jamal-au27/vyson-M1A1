const db = require('../config/database')

const createDataQuery = `

CREATE TABLE IF NOT EXISTS url_shortner (
   id INT AUTO_INCREMENT PRIMARY KEY,
   long_url VARCHAR(2083) NOT NULL,
   short_url VARCHAR(50) NOT NULL UNIQUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)   
INSERT INTO url_shortner(long_url,short_url)
VALUES
    ('https://example.com/home-page','home-page),
    ('https://example.com/cart-page','cart-page),
    ('https://example.com/catalogue-page','catalogue-page),
    ('https://example.com/product-page','product-page),
    ('https://example.com/payment-page','payment-page),

`;
db.query(createDataQuery,(err,results) => {
    if (err){
        console.error(`Error executing SQL : ${err.message}`)
        return
    }
    console.log(`Table created successfully!!`);
    
    
})
db.query('SELECT * FROM url_shortner',(err,results) => {
    if (err) {console.error(`Error fetching data : ${err.message}`)
        return;

    }
    console.log(`Fetched data : ${results}`);
    
})
db.end()
