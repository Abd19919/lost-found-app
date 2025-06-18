const { Client } = require('pg');
require('dotenv').config();

const db = new Client({
  connectionString: process.env.DATABASE_URL,
});

db.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('DB Connection error:', err));

module.exports = db;