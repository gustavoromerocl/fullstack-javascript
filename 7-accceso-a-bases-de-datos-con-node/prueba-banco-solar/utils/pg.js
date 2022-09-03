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
  } catch ({ code, message }) {
    return { code, message }
  } finally {
    if (client) client.release(pool.end)
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

const realizarTransferencia = async (values) => {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN;');
    const result = await client.query({
      text: `INSERT INTO transferencias (emisor, receptor, monto, fecha) 
      VALUES ((select id from usuarios where nombre = $1), (select id from usuarios where nombre = $2), $3, $4)
      RETURNING *;`,
      values
    });

    if (result.rowCount >= 1) {
      await client.query({
        text: 'UPDATE usuarios SET balance = balance - $1 WHERE nombre = $2 RETURNING *;',
        values: [values[2], values[0]]
      });

      await client.query({
        text: `UPDATE usuarios SET balance = balance + $1 where nombre = $2 RETURNING *;`,
        values: [values[2], values[1]]
      });
    }
    await client.query('COMMIT;');
  } catch ({ code, message }) {
    console.log(message);
    if (client) await client.query('ROLLBACK');
    return { code, message };
  } finally {
    if (client) client.release(pool.end)
  }
}

const listarTransferencias = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'SELECT * FROM transferencias;'
    });

    return result.rows;
  } catch ({code, message}) {
    return {code, message}
  } finally {
    if(client) client.release(pool.end)
  }
}

module.exports = {
  insertarUsuario,
  listarUsuarios,
  actualizarUsuario,
  desactivarUsuario,
  realizarTransferencia,
  listarTransferencias
}