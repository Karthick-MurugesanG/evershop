const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost', // Use your container name
  database: process.env.DB_NAME || 'evershop1',
  password: process.env.DB_PASSWORD || 'Km979057',
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Database connection error:', err));

module.exports = pool;
