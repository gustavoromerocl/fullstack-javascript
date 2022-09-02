require('dotenv').config();
const { Pool } = require('pg');

// 1. Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la
// gestión y persistencia de datos. (3 Puntos)

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
}

const pool = new Pool(config);

const insertarUsuario = async (values) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query({
      text: 'INSERT INTO usuarios(nombre, balance) VALUES($1,$2) RETURNING *;',
      values
    });

    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
}

const listarUsuarios = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'SELECT * FROM usuarios WHERE activo = true;'
    });

    return result.rows;
  }catch({code, message}) {
    return {code, message}
  }finally {
    if(client) client.release(pool.end)
  }
}

const actualizarUsuario = async (values) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query({
      text: 'UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *;',
      values
    });

    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
}

const desactivarUsuario = async (values) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query({
      text: 'UPDATE usuarios SET activo = $1 WHERE id = $2 RETURNING *;',
      values
    });

    return result;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
}

module.exports = { 
  insertarUsuario, 
  listarUsuarios,
  actualizarUsuario,
  desactivarUsuario
}