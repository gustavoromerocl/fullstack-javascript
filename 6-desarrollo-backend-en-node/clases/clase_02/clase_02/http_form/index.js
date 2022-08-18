const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 3000;

const server = http.createServer((request, response) => {
  const params = url.parse(request.url, true).query;

  if (request.url.startsWith('/crear?name=')) {
    const { name, message } = params;
    fs.writeFile(`http_form/files/${name}`, message, 'utf8', (err) => {
      if (err) {
        response.write('Ha ocurrido un error al guardar el archivo...');
        return response.end();
      }
      response.write('Archivo creado...');
      response.end();
    });
  } else if (request.url.startsWith('/leer?name=')) {
    const { name } = params;
    fs.readFile(`http_form/files/${name}`, 'utf8', (err, data) => {
      if (err) {
        response.write('Ha ocurrido un error al leer el archivo...');
        return response.end();
      }
      response.write(data);
      response.end();
    });
  } else if (request.url.startsWith('/renombrar?name=')) {
    const { name, newName } = params;
    fs.rename(`http_form/files/${name}`, `http_form/files/${newName}`, (err) => {
      if (err) {
        response.write('Ha ocurrido un error al renombrar el archivo...');
        return response.end();
      }
      response.write('Se renombro exitosamente el archivo...');
      response.end();
    });
  } else if (request.url.startsWith('/eliminar?name=')) {
    const { name } = params;
    fs.unlink(`http_form/files/${name}`, (err) => {
      if (err) {
        response.write('Ha ocurrido un error al eliminar el archivo...');
        return response.end();
      }
      response.write('Archivo eliminado con exito...');
      response.end();
    });
  } else {
    response.write('404 not found');
    response.end();
  }

});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
