require("dotenv").config();
const express = require("express");
const { Pool } = require("pg"); // PostgreSQL connection
const app = express();

app.use(express.json()); // Middleware to handle JSON requests

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Start Server (Only One!)
app.listen(5000, () => console.log("🚀 Backend running on port 5000"));

console.log("DATABASE_URL:", process.env.DATABASE_URL);