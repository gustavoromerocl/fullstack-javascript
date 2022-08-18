const fs = require('fs');

fs.readFile('crud/bitacora.log', 'utf8', (err, file) => {
  if (err) {
    return console.log('Ha ocurrido un error al leer el archivo...');
  }
  console.log(file);
});
