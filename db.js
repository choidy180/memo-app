const { Pool } = require('pg');

process.loadEnvFile(); // .env 파일의 값을 process.env에 넣는다

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
