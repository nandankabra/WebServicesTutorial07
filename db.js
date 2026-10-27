// db.js -- one shared connection pool to MySQL
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
host: 'localhost',
user: 'root',
password: 'Root@12345',

database: 'gqldemo',
});
module.exports = pool;