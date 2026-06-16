import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "recipes_db",
    user: "postgres",
    password: "your_password"
});

pool.on("connect", () => {
    console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
    console.error("PostgreSQL error:", err);
});