const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_postgres_username', // replace with your username
  host: 'localhost',
  database: 'your_database_name', // replace with your database name
  password: 'your_postgres_password', // replace with your password
  port: 5432,
});

module.exports = pool;