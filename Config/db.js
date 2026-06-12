import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "recipesdb",
  password: "yourpassword",
  port: 5432
});
