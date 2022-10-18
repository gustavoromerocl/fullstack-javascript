const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const fs = require('fs');

/* const bodyParser = require('body-parser'); */

const app = express();
app.listen(process.env.PORT || 3_000);

app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: 'El peso del file excede lo permitido'
  })
);

app.get('/', (req, res) => res.render('home'));

app.post('/subirfoto', (req, res) => {
  const { nombre, apellido } = req.body;
  const { foto } = req.files;
  const fileName = `${nombre}_${apellido}_${foto.name}`;
  foto.mv(`${process.cwd()}/src/utils/uploads/${fileName}`, (err) => {
    if (err) return res.status(500).json({ code: 500, message: 'Ha ocurrido un error en el servidor.', error: err });
    res.send('Tu img fue cargada en el servidor...');
  });
});

app.post('/eliminarfoto', (req, res) => {
  try {
    const { filedelete } = req.body;
    fs.unlinkSync(`${process.cwd()}/src/utils/uploads/${filedelete}`);
    res.send('Img eliminada con exito');
  } catch (error) {
    res.send('Error al eliminar la img.');
  }
});

app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not Found!' }));

module.exports = { app };
