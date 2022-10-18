require('dotenv').config();
const { Pool } = require('pg');
const Cursor = require('pg-cursor');

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
};
const pool = new Pool(config);

// * **********
// * CURSORES *
// * **********

// * Construir una aplicación que consulte e imprima por
// * consola los primeros 5 clientes del restaurante “Full Belly,
// * Happy Heart”, de manera que los usuarios de la base de
// * datos serán los clientes de este restaurante. Realizar la
// * primera consulta con cursores desde una aplicación
// * Node

const readClientes5 = async () => {
  let client, cursor;
  try {
    client = await pool.connect();
    cursor = client.query(new Cursor('SELECT * FROM usuarios;'));
    const result = await cursor.read(5);
    console.log(result);
  } catch ({ code, message }) {
    console.log({ code, message });
  } finally {
    if (cursor) cursor.close();
    if (client) client.release(pool.end);
  }
};

// readClientes5();

// * Basado en el ejercicio de los clientes del restaurante,
// * desarrolla una aplicación en Node que realice una
// * consulta SQL con el paquete pg-cursor para obtener los
// * primeros 20 usuarios de la tabla usuarios.

const readClientes20 = async () => {
  let client, cursor;
  try {
    client = await pool.connect();
    cursor = client.query(new Cursor('SELECT * FROM usuarios;'));
    const result = await cursor.read(20);
    console.log(result);
  } catch ({ code, message }) {
    console.log({ code, message });
  } finally {
    if (cursor) cursor.close();
    if (client) client.release(pool.end);
  }
};

// readClientes20();

// * Propio de mi jajajja
// * Retornar solo los mails @hotmail.com
// * Query: SELECT * from usuarios WHERE email LIKE '%@hotmail.com';

const readHotmail = async (dominio) => {
  let client, cursor;
  try {
    client = await pool.connect();
    cursor = client.query(new Cursor('SELECT * from usuarios WHERE email LIKE $1;', [dominio]));
    const result = await cursor.read();
    console.log(result);
  } catch ({ code, message }) {
    console.log({ code, message });
  } finally {
    if (cursor) cursor.close();
    if (client) client.release(pool.end);
  }
};

// readHotmail('%@cox.net');

// * ***************
// * Transacciones *
// * ***************

// * Desarrollar una aplicación en Node, que al ser ejecutada
// * realice consultas SQL, usando las transacciones para
// * transferir $25.000 desde el cliente registrado en la tabla
// * usuarios de correo yuki_whobrey@aol.com, al cliente
// * también registrado en la tabla con el correo
// * fletcher.flosi@yahoo.com, ambos son clientes del banco
// * llamado “Dinero Azul”.

const transferencia1 = async () => {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');

    await client.query({
      text: 'UPDATE usuarios SET saldo = saldo - $2 WHERE email = $1;',
      values: ['fletcher.flosi@yahoo.com', 25_000]
    });

    await client.query({
      text: 'UPDATE usuarios SET saldo = saldo + $2 WHERE email = $1;',
      values: ['yuki_whobrey@aol.com', 25_000]
    });

    await client.query('COMMIT');
  } catch ({ code, message }) {
    if (client) await client.query('ROLLBACK');
    console.log({ code, message });
  } finally {
    if (client) client.release(pool.end);
  }
};

// transferencia1();

// * Basado en el ejercicio de transacciones del banco “Dinero
// * Azul”, desarrollar una aplicación en Node que realice
// * consultas SQL para ejecutar una transacción que
// * transfiera $30000 de saldo del usuario con correo
// * bette_nicka@cox.net al usuario con correo
// * vinouye@aol.com

const transferencia2 = async (cuentaOrigen, cuentaDestino, monto) => {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN;');

    const results = await client.query({
      text: 'UPDATE usuarios SET saldo = saldo - $2 WHERE email = $1;',
      values: [cuentaOrigen, monto]
    });

    if (results.rowCount >= 1) {
      await client.query({
        text: 'UPDATE usuarios SET saldo = saldo + $1 WHERE email = $2;',
        values: [monto, cuentaDestino]
      });
    } else {
      console.log('La cuenta de origen no fue encontrada...');
    }

    await client.query('COMMIT;');
  } catch ({ code, message }) {
    if (client) await client.query('ROLLBACK;');
    console.log({ code, message });
  } finally {
    if (client) client.release(pool.end);
  }
};

// Origen - Destino - Monto
// transferencia2('bette_nicka@cox.net', 'vinouye@aol.com', 30_000);

// * Basado en el ejercicio de transacciones del banco “Dinero
// * Azul”, desarrollar una aplicación en Node que realice
// * consultas SQL para ejecutar una transacción que
// * transfiera $10.000 de saldo del usuario con correo
// * albina@glick.com al usuario con correo
// * shawna_palaspas@palaspas.org.

// * Imprimir por consola el resultado de ambas consultas
// * SQL para demostrar que los saldos fueron modificados.

const transferencia3 = async (mailOrigen, mailDestiuno, monto) => {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN;');

    const consulta = {
      text: 'SELECT * FROM usuarios WHERE email IN ($1, $2);',
      values: [mailOrigen, mailDestiuno]
    };
    const saldoOriginal = await client.query(consulta);
    console.log('Saldo Original:');
    console.table(saldoOriginal.rows);

    await client.query({
      text: 'UPDATE usuarios SET saldo = saldo - $2 WHERE email = $1;',
      values: [mailOrigen, monto]
    });

    await client.query({
      text: 'UPDATE usuarios SET saldo = saldo + $2 WHERE email = $1;',
      values: [mailDestiuno, monto]
    });

    const saldoFinal = await client.query(consulta);
    console.log('\nSaldo Final:');
    console.table(saldoFinal.rows);

    await client.query('COMMIT;');
  } catch ({ code, message }) {
    if (client) await client.query('ROLLBACK;');
    console.log({ code, message });
  } finally {
    if (client) client.release(pool.end);
  }
};

transferencia3('albina@glick.com', 'shawna_palaspas@palaspas.org', 10_000);
