import fs from "fs";
import pool from "./dbConnection.js";

async function createTables() {
  try {
    const sql = fs.readFileSync("./database/sqlschema.sql", "utf8");

    await pool.query(sql);

    console.log(" Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err.message);
  } finally {
    await pool.end();
  }
}

createTables();