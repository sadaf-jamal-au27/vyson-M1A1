const mysql = require('mysql2')
const dbConfig = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'url_shortner_db'
});
dbConfig.connect((err) => {
    if(err) throw err;
    console.log('Database connected successfully!!');
    
})
module.exports = dbConfig;