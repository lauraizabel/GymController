const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "3558",
  host: "localhost",
  port: 5432,
  database: "gymmanager",
});
