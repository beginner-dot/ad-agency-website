require('dotenv').config();
const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL + "?sslmode=disable", // Disable SSL for compatibility
  ssl: false // Explicitly disable SSL
});

// Function to test database connection
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully:', res.rows[0]);
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
}

// Run the test on startup
testConnection();

// Export the connection pool for use in other files
module.exports = pool;