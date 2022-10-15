const { Pool } = require("pg");

const commands = process.argv.slice(2);

// 1. Realizar la conexión con PostgreSQL con la clase Client.

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'alwaysmusic',
  password: 'postgres',
  port: 5432,
  min: 2,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000
};

const pool = new Pool(config);

// 2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const addStudent = async () => {
  pool.connect(async (errC, client, release) => {
    if (errC) return console.error("Ha habido un problema de conexión a la BD", errC.code);

    const SQLQuery = {
      name: "insert-usuarios",
      text: "insert into usuarios (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;",
      values: [`${commands[1]}`, `${commands[2]}`, `${commands[3]}`, `${commands[4]}`]
    }

    await client.query(SQLQuery);
    console.log(`El estudiante "${commands[1]}" fue agregado con éxito`);
    release();
    pool.end();

  });
}

// 3. Crear una función asíncrona para obtener por consola el registro de un estudiante
// por medio de su rut.

const getStudent = async () => {
  pool.connect(async (errC, client, release) => {
    if (errC) return console.error("Ha habido un problema de conexión a la BD", errC.code);

    const SQLQuery = {
      name: "get-usuario",
      rowMode: "array",
      text: "SELECT * FROM usuarios WHERE rut = $1",
      values: [`${commands[1]}`]
    }

    const res = await client.query(SQLQuery);
    res.rowCount > 0
      ? console.log(`El estudiante con rut ${commands[1]} es el siguiente:`, res.rows)
      : console.log(`El estudiante no existe`);

    release();
    pool.end();

  });
}

// 4. Crear una función asíncrona para obtener por consola todos los estudiantes
// registrados.

const findAllStudents = async () => {
  pool.connect(async (errC, client, release) => {
    if (errC) return console.error("Ha habido un problema de conexión a la BD", errC.code);

    const SQLQuery = {
      name: "find-usuarios",
      rowMode: "array",
      text: "SELECT * FROM usuarios",
    };

    const res = await client.query(SQLQuery);
    console.log("Estudiantes: ", res.rows);
    release();
    pool.end();
  });
}

// 5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de
// datos.

const updateStudent = async () => {
  pool.connect(async (errC, client, release) => {
    if (errC) return console.error("Ha habido un problema de conexión a la BD", errC.code);


    const SQLQuery = {
      name: "update-usuario",
      text: "UPDATE usuarios SET nivel = $1 WHERE rut = $2",
      values: [`${commands[4]}`, `${commands[2]}`]
    };

    const res = await client.query(SQLQuery);

    res.rowCount > 0
      ? console.log(`El estudiante "${commands[1]}" ha sido editado con éxito`)
      : console.log(`Hubo un problema al realizar la actualización`);

    release();
    pool.end();

  });

}


// 6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de
// datos.

const destroyStudent = async () => {
  pool.connect(async (errC, client, release) => {
    if (errC) return console.error("Ha habido un problema de conexión a la BD", errC.code);

    const SQLQuery = {
      name: "destroy-usuario",
      text: "DELETE FROM usuarios WHERE rut = $1",
      values: [`${commands[1]}`]
    }

    const res = await client.query(SQLQuery);

    res.rowCount > 0
      ? console.log(`Registro de estudiante con rut ${commands[1]} ha sido eliminado`)
      : console.log(`Hubo un problema al realizar la eliminación`);

    release();
    pool.end();
  });

}

if (commands[0] == "nuevo") addStudent();
if (commands[0] == "consulta") findAllStudents();
if (commands[0] == "editar") updateStudent();
if (commands[0] == "eliminar") destroyStudent();
if (commands[0] == "rut") getStudent();

//COMANDOS

// node index.js nuevo 'nombre' 'rut' curso nivel
// node index.js consulta
// node index.js rut '11111111-1'
// node index.js editar nombre rut curso nivel
// node index.js eliminar rut