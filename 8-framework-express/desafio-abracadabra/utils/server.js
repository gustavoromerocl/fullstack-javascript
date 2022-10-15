const express = require('express');
const fs = require("fs");

const app = express();

// 2. Definir la carpeta “assets” como carpeta pública del servidor.

//Lee los archivos staticos de la carpeta public
app.use(express.static('./public/assets', { root: process.cwd() }));

app.use(express.json());

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
// usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado
// en el servidor.
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const file = JSON.parse(fs.readFileSync('data/users.json'));
  console.log(file);
  const user = file.usuarios.find(u => u.toLowerCase() === req.params.usuario.toLowerCase())
  console.log(typeof user);
  if (user) {
    next();
  } else {
    res.sendFile('./public/assets/img/who.jpeg', { root: process.cwd() });
  }
});

app.get('/abracadabra/juego/:usuario', (req, res) => res.sendFile('./public/index.html', { root: process.cwd() }));

// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de
// la ruta /abracadabra/usuarios.
app.get('/abracadabra/usuarios', (req, res) => {
  const file = JSON.parse(fs.readFileSync('data/users.json'));
  res.json(file);
});

// 5. Crear una ruta / abracadabra / conejo /:n que valide si el parámetro “n” coincide con el
// número generado de forma aleatoria.
// En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la
// imagen de Voldemort.

app.get('/abracadabra/conejo/:n', (req, res) => {
  const numero = req.params.n;

  const numeroRandom = Math.ceil(Math.random()*4);
  console.log(numero, numeroRandom)
  numero == numeroRandom
    ? res.sendFile('./public/assets/img/conejito.jpg', { root: process.cwd() })
    : res.sendFile('./public/assets/img/voldemort.jpg', { root: process.cwd() });
})

// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...”
// al consultar una ruta que no esté definida en el servidor.
app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Esta página no existe...' }));


// 1. Crear un servidor con Express en el puerto 3000.
app.listen(process.env.PORT || 3_000);

module.exports = { app };
