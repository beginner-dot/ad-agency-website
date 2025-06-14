
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3000"] }));

// Hardcoded database connection
const pool = new Pool({
  connectionString: 'postgres://postgres:new_password@localhost:5432/postgres',
});

// Handle PostgreSQL errors
pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err);
});

// Verify database connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL");
    client.release();
  } catch (err) {
    console.error("PostgreSQL connection error:", err);
    process.exit(1);
  }
})();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Advertising Agency API!");
});

app.get("/clients", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients");
    res.json(result.rows);
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Error handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);
});

// Start server
const PORT = 5000;
app.listen(PORT, "127.0.0.1", () => console.log(`Backend running on port ${PORT}`));
