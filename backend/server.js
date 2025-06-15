const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debugging to ensure .env loads

const express = require("express");
const cors = require("cors"); // Allow cross-origin requests
const { Pool } = require("pg"); // PostgreSQL connection
const app = express();

app.use(express.json()); // Middleware to handle JSON requests
app.use(cors()); // Enable CORS for frontend communication

// Set up PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Verify database connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

// Homepage Route
app.get("/", (req, res) => {
  res.send("Welcome to the Advertising Agency API!");
});

// API Route to Fetch Clients
app.get("/clients", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Database query failed:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// API Route to Fetch a Single Client by ID
app.get("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM clients WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Database query failed:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Start Server - Listening Explicitly on Localhost
const PORT = 5000;
app.listen(PORT, "127.0.0.1", () => console.log(`🚀 Backend running on port ${PORT}`));