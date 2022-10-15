require('dotenv').config()
const { Pool } = require('pg');

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
};

const pool = new Pool(config);

const insert = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES ($1,$2,$3,$4) RETURNING *;',
      values
    });

    return result.rows;
  } catch ({ code, message }) {

  } finally {
    if (client) client.release(pool.end)
  }
};

const findAll = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'SELECT * FROM cursos'
    });

    return result.rows;
  } catch ({ code, message }) {

  } finally {
    if (client) client.release(pool.end)
  }
};

const update = async (values) => {
  console.log(values);
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *;',
      values
    });

    return result.rows;
  } catch ({ code, message }) {

  } finally {
    if (client) client.release(pool.end)
  }
};

const destroy = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'DELETE FROM cursos WHERE id = $1 RETURNING *;',
      values
    });

    return result;
  } catch ({ code, message }) {

  } finally {
    if (client) client.release(pool.end)
  }
}

module.exports = { insert, findAll, update, destroy };