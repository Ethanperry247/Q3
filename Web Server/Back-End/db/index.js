const Pool = require('pg').Pool;
const { DB } = require('./db.js');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'rootuser',
    port: 5432,
});

async function createDB () {
    return await pool.connect();
}

// Inject the database connection into the database adapter.
const database = new DB(createDB);

module.exports = database;