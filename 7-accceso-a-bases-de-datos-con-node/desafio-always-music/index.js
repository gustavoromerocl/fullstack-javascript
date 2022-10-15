const { Client } = require("pg");

const commands = process.argv.slice(2);

// 1. Realizar la conexión con PostgreSQL con la clase Client.

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'alwaysmusic',
  password: 'postgres',
  port: 5432,
};

const client = new Client(config);

client.connect();

// 2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const addStudent = async () => {
  const res = await client.query(`insert into usuarios (nombre, rut, curso, nivel) values ('${commands[1]}', '${commands[2]}', '${commands[3]}', '${commands[4]}') RETURNING *;`);
  res.rowCount > 0 && console.log(`El estudiante ${commands[1]} agregado con éxito`);

  client.end();
}

// 3. Crear una función asíncrona para obtener por consola el registro de un estudiante
// por medio de su rut.

const getStudent = async () => {
  const res = await client.query(`SELECT * FROM usuarios WHERE rut = '${commands[1]}'`);
  res.rowCount > 0 && console.log(`El usuario con rut: ${commands[1]} es: `, res.rows);

  client.end();
}

// 4. Crear una función asíncrona para obtener por consola todos los estudiantes
// registrados.

const findAllStudents = async () => {
  const res = await client.query("SELECT * FROM usuarios");
  console.log("Registros ", res.rows);
  client.end();
}

// 5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de
// datos.

const updateStudent = async () => {
  const res = await client.query(`UPDATE usuarios SET nivel = ${commands[4]}, nombre = '${commands[1]}', curso = '${commands[3]}' WHERE rut = '${commands[2]}'`);
  res.rowCount > 0 && console.log(`El estudiante ${commands[1]} ha sido editado con éxito`);
  client.end();
}


// 6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de
// datos.

const destroyStudent = async () => {
  const res = await client.query(`DELETE FROM usuarios WHERE rut = '${commands[1]}'`);
  res.rowCount > 0 && console.log(`Registro de estudiante con rut ${commands[1]} ha sido eliminado`);
  client.end();
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