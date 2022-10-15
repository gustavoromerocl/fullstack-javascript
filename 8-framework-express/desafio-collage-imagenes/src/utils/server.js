const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();
app.listen(3_000);

app.use('/assets', express.static('./public/assets', { root: process.cwd() }));
app.use(fileUpload({
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  abortOnLimit: true,
  responseOnLimit: 'El peso del file excede los 5MB permitidos'
}));

app.get('/', (req, res) => res.sendFile('./public/formulario.html', { root: process.cwd() }));
app.get('/collage', (req,res) => res.sendFile('./public/collage.html', { root: process.cwd() }));

app.post('/imagen', function (req, res) {
  const { target_file } = req.files;
  const body = req.body;
  const { posicion } = body;


  target_file.mv(`${process.cwd()}/public/assets/imgs/imagen-${posicion}.jpg`, (err) => {
    if (err) return res.status(500).json({ code: 500, message: 'Page not found' });
    // res.send('Imagen cargada con éxito');
    res.redirect('/collage');
  });
});

app.get('/deleteImg/:nombre', (req, res) => {
  console.log(req.params);
  try {
    const { nombre } = req.params;
    fs.unlinkSync(`${process.cwd()}/public/assets/imgs/${nombre}`);
    res.redirect('/collage');
  } catch (err) {
    res.send('Error al eliminar la imgagen');
  }
})


app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not Found' }));

module.exports = { app };