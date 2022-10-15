const { Pool } = require('pg');

const config = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'repertorio'
};

const pool = new Pool(config);

const insertar = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'INSERT INTO repertorio (cancion, artista, tono) VALUES($1, $2, $3) RETURNING *;',
      values
    });
    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

const leer = async ()=> {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'SELECT * FROM repertorio;'
    });
    return result.rows;
  } catch ({code, message}) {
    return {code, message};
  }finally{
    if(client) client.release(pool.end);
  }
};

const actualizar = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'UPDATE repertorio SET cancion = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *;',
      values
    });
    return result.rows;
  } catch ({code, message}) {
    return {code, message};
  }finally{
    if(client) client.release(pool.end);
  }
};

const eliminar = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'DELETE FROM repertorio WHERE id = $1 RETURNING *',
      values
    });
    return result.rows;
  } catch ({code, message}) {
    return {code, message};
  } finally {
    if(client) client.release(pool.end);
  }
};


module.exports = { insertar, leer, actualizar, eliminar };