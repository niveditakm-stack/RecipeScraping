import pool from "./database/dbConnection.js";

try {
  const result = await pool.query("SELECT NOW()");
  console.log("[SUCCESS] Connected to PostgreSQL");
  console.log(result.rows);
} catch (err) {
  console.error("[ERROR]", err.message);
}

process.exit();