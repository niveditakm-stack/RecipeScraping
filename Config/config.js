import "dotenv/config";

export default {
  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  scraper: {
    baseUrl: process.env.TARLA_DALAL_BASE_URL || "https://www.tarladalal.com",
    delayBetweenRequests: 2000,
    headless: false,
  },
};
