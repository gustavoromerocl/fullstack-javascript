const fs = require('fs');

fs.writeFile('crud/bitacora.log', 'Hola mundo desde node js', 'utf8', (err) => {
  if (err) {
    return console.log('Ha ocurrido un error...');
  }
  console.log('Archivo creado con exito...');
});
