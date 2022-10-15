const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// 1. Crear una ruta raíz que al ser consultada renderice una vista con un parcial
// “Dashboard” enviándole en el render un arreglo con los names de los productos. Se
// recomienda que estos coincidan con las imágenes de cada producto.

let products = [
  { name: 'banana' },
  { name: 'cebollas' },
  { name: 'pimenton' },
  { name: 'papas' },
  { name: 'lechuga' },
  { name: 'tomate' }
];

//Config
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  layoutsDir: './src/views/layouts',
  partialsDir: './src/views/partials'
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

//Middlewares
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist', { root: process.cwd() }));
app.use('/assets', express.static('./public/assets', { root: process.cwd() }));


//Routes
app.get('/', (req, res) => res.render('home', { products }));



app.listen(process.env.PORT || 3_000);