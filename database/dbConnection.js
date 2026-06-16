import pg from "pg";
import config from "../config/config.js";

const { Pool } = pg;

const pool = new Pool(config.database);

pool.on("connect", () => {
  console.log("[DB] Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("[DB] Unexpected error:", err.message);
});

export default pool;
