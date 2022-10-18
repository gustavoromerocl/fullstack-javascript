const express = require('express'); // ! importando express

const app = express(); // ! Ejecucion de express
app.listen(process.env.PORT || 3_000); // ! asigna el puerto al servidor

// ! app.use (Configuraciones)
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist', { root: process.cwd() })); // ! retorna Bootstrap (CSS and JS)
app.use('/jquery', express.static('./node_modules/jquery/dist', { root: process.cwd() })); // ! retorna Jquery
app.use('/assets', express.static('./public/assets', { root: process.cwd() })); // ! retorna Assets
// ! Fin app.use


// ! Rutas del server

app.get('/', (req, res) => res.sendFile('./public/index.html', { root: process.cwd() })); // ! retorna para la ruta raiz el index.html

app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not Found!!!' })); // ! ruta por defecto

// ! Fin de las Rutas del server

module.exports = { app }; // ! exportando el modulo
