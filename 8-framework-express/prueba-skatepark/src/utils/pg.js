require('dotenv').config();
const { Pool } = require('pg');

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
};

const pool = new Pool(config);

const createUser = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
      values
    });
    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

const getUsers = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'SELECT * FROM skaters;',
    });
    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

const findOneUser = async (values) => {
  let client; 
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'SELECT * FROM skaters WHERE id = $1;',
      values
    });
    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
} 

const updateUser = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'UPDATE skaters SET nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5 WHERE id = $1 RETURNING *;',
      values
    });
    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

const destroyUser = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'DElETE FROM skaters WHERE id = $1',
      values
    });

    return result.rowCount;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

const setUserState = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'UPDATE skaters SET estado = $2 WHERE id = $1 RETURNING *;',
      values
    });
    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  destroyUser,
  findOneUser,
  setUserState
}
