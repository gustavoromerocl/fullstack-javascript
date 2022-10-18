const express = require('express'); // ! importando express
const exphbs = require('express-handlebars'); // ! importando express-handlebars

const app = express(); // ! Ejecucion de express
app.listen(process.env.PORT || 3_000); // ! asigna el puerto al servidor

// ! Configuracion del motor de vistas para express
app.engine('hbs', exphbs.engine({
  extname: 'hbs', // ! asigna un nuevo nombre de la extencion
  layoutsDir: './src/views/layouts', // ! Cambia el directorio de los layouts
  partialsDir: './src/views/partials' // ! Cambia el directorio de los partials
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');
// ! Fin Configuracion del motor de vistas para express


// ! app.use (Configuraciones)
app.use('*/bootstrap', express.static('./node_modules/bootstrap/dist', { root: process.cwd() })); // ! retorna Bootstrap (CSS and JS)
app.use('*/jquery', express.static('./node_modules/jquery/dist', { root: process.cwd() })); // ! retorna Jquery
app.use('*/assets', express.static('./public/assets', { root: process.cwd() })); // ! retorna Assets
// ! Fin app.use


// ! Rutas del server
app.get('/', (req, res) => res.render('home')); // ! renderiza la vista home
app.get('/contact', (req, res) => res.render('contact')); // ! renderiza la vista contact
app.get('/galeria', (req, res) => {
  const usuarios = ['Cristia', 'Rodolfo', 'Daniela', 'Romina'];
  res.render('galeria', { usuarios, nombre: 'Raul' });
}); // ! renderiza la vista galeria
app.get('/spinner/:color', (req, res) => {
  const colores = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  res.render('spinner', { color: req.params.color, colores });
}); // ! renderiza la vista spinner
app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not Found!!!' })); // ! ruta por defecto
// ! Fin de las Rutas del server

module.exports = { app }; // ! exportando el modulo
