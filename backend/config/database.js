const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});
module.exports = db;
