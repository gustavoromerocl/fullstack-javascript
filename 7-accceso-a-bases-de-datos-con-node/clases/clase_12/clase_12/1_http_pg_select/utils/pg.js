const { Pool } = require('pg');

const config = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432
};

const pool = new Pool(config);

const fecha = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'SELECT_ NOW();'
    });
    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

module.exports = {
  fecha
};
