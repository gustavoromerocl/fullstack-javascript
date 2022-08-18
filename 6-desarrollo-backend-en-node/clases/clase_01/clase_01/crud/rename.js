const fs = require('fs');

fs.rename('crud/bitacora.log', 'crud/registro.log', (err) => {
  if (err) {
    return console.log('Ha ocurrido un error al cambiar el nombre del archivo...');
  }
  console.log('Se ha cambiado el nombre de forma exitosa...');
});

