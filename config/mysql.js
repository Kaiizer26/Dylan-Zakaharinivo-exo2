const mysql = require('mysql2/promise');

let pool;

function connectMySQL() {
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'todolist',
        waitForConnections: true,
        connectionLimit: 10
    });

    pool.getConnection()
        .then(function(connection) {
            console.log('MySQL connecté avec succès');
            connection.release();
            createTable();
        })
        .catch(function(err) {
            console.log('Erreur MySQL: ' + err);
        });
}

function createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            mongo_id VARCHAR(255),
            title VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    
    pool.query(query)
        .then(function() {
            console.log('Table tasks créée ou existe déjà');
        })
        .catch(function(err) {
            console.log('Erreur création table: ' + err);
        });
}

function getPool() {
    return pool;
}

module.exports = { connectMySQL, getPool };
