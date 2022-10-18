const { Pool } = require('pg');

const config = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'canales'
};

const pool = new Pool(config);

const createCanal = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'INSERT INTO canales (nombre) VALUES($1) RETURNING *;',
      values
    });
    return result.rows;
  } catch ({ error, message }) {
    return { error, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

const readCanal = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'SELECT * FROM canales;'
    });
    return result.rows;
  } catch ({ error, message }) {
    return { error, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

const updateCanal = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'UPDATE canales SET nombre = $2 WHERE id = $1 RETURNING *;',
      values
    });
    return result.rows;
  } catch ({ error, message }) {
    return { error, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

const deleteCanal = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'DELETE FROM canales WHERE id = $1 RETURNING *;',
      values
    });
    return result.rows;
  } catch ({ error, message }) {
    return { error, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

module.exports = {
  createCanal,
  readCanal,
  updateCanal,
  deleteCanal
};
