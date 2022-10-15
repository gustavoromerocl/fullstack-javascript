const { Pool } = require('pg');
const Cursor = require('pg-cursor');
const [query, descripcion, fecha, monto, cuenta] = process.argv.slice(2)

const config = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'banco'
}

const pool = new Pool(config);


// 1. Crear una función asíncrona que registre una nueva transacción utilizando valores
// ingresados como argumentos en la línea de comando. Debe mostrar por consola la
// última transacción realizada.

const crearTransaccion = async (descripcion, fecha, monto, cuenta) => {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN;');
    const resSel = await client.query({ text: 'SELECT id FROM cuentas WHERE id = $1;', values: [cuenta] });
    if (resSel.rowCount >= 1) {
      const resIns = await client.query({
        text: `INSERT INTO transacciones (descripcion, fecha, monto, cuenta) 
               VALUES ($1, $2, $3, $4) 
               RETURNING *;`,
        values: [descripcion, fecha, monto, cuenta]
      });
      if (resIns.rowCount >= 1) {
        const resUpd = await client.query({
          text: 'UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2 RETURNING *;',
          values: [monto, cuenta]
        });
        console.log(resIns.rows);
        console.log(resUpd.rows);
      } else {
        console.log('No se pudo realizar la transaccion...');
      }
    } else {
      console.log('No existe la cuenta destino para la transaccion...');
    }
    await client.query('COMMIT;');
  } catch ({ code, message }) {
    if (client) await client.query('ROLLBACK;');
    console.log({ code, message });
  } finally {
    if (client) client.release(pool.end);
  }
};

// 2. Realizar una función asíncrona que consulte la tabla de transacciones y retorne
// máximo 10 registros de una cuenta en específico. Debes usar cursores para esto.

const leerTransaccion = async (cuenta) => {
  let client, cursor;
  try {
    client = await pool.connect();
    cursor = await client.query(new Cursor('SELECT * FROM transacciones WHERE cuenta = $1;', [cuenta]));
    const result = await cursor.read(10);
    console.log(result);
  } catch ({ code, message }) {
    console.log({ code, message });
  } finally {
    if (cursor) cursor.close();
    if (client) client.release(pool.end);
  }
};

// 3. Realizar una función asíncrona que consulte el saldo de una cuenta y que sea
// ejecutada con valores ingresados como argumentos en la línea de comando. Debes
// usar cursores para esto.

const leerSaldo = async (cuenta) => {
  let client, cursor;
  try {
    client = await pool.connect();
    cursor = await client.query(new Cursor('SELECT saldo FROM cuentas WHERE id = $1;', [cuenta]));
    const result = await cursor.read();
    console.log(result);
  } catch ({ code, message }) {
    console.log({ code, message });
  } finally {
    if (cursor) cursor.close();
    if (client) client.release(pool.end);
  }
};


const validarDatos = () => {
  if (!descripcion) {
    console.log('No se ha ingresado un descripcion...');
    return false
  }

  if (!fecha) {
    console.log('No se ha ingresado una fecha...');
    return false
  }

  if (!monto) {
    console.log('No se ha ingresado un monto...');
    return false
  }

  if (!cuenta) {
    console.log('No se ha ingresado una cuenta...');
    return false
  }

  return true
}

if (query === 'registrar') {
  if (validarDatos()) {
    crearTransaccion(descripcion, fecha, monto, cuenta);
  }
}

if (query === 'transacciones') {
  const [cuentaTran] = process.argv.slice(3);
  cuentaTran ? leerTransaccion(cuentaTran) : console.log('No se ha ingresado una cuenta...');
}

if (query === 'cuentas') {
  const [id] = process.argv.slice(3);
  id ? leerSaldo(id) : console.log('No se ha ingresado una cuenta...');
}
