const pool = require('./db');

async function main() {
  try {
    const result = await pool.query('SELECT current_database() AS db');
    console.log('연결 성공:', result.rows[0].db);
  } catch (err) {
    console.error('연결 실패:', err.code, err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
