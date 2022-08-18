const { fstat } = require('fs');
const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 8080;

// 1. Crear un servidor en Node con el módulo http.

const server = http.createServer((request, response) => {
  //   2. Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta recibida.
  const params = url.parse(request.url, true).query;
  // console.log(params);

  if (request.url.startsWith('/crear?archivo=')) {
    const { archivo, contenido } = params;

    fs.writeFile(`files/${archivo}`, contenido, 'utf8', (error) => {
      if (error) {
        response.write('Ha ocurrido un error al guardar el archivo');
        return response.end();
      }
      response.write('Archivo creado');
      response.end();
    });
  } else if (request.url.startsWith('/leer?archivo=')) {
    const { archivo } = params;
    // 3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es declarado en los parámetros de la consulta recibida.
    fs.readFile(`files/${archivo}`, 'utf-8', (error, data) => {
      if (error) {
        response.write('Ha ocurrido un error al leer el archivo');
        return response.end();
      }
      response.write(data);
      response.end();
    });
  } else if (request.url.startsWith('/renombrar?nombre=')) {
    const { nombre, nuevoNombre } = params;
    // 4. Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es
    // declarado en los parámetros de la consulta recibida.
    fs.rename(`files/${nombre}`, `files/${nuevoNombre}`, (error) => {
      if (error) {
        response.write('Ha ocurrido un error al renonmbrar el archivo');
        return response.end();
      }

      response.write('Archivo renombrado');
      response.end();
    });
  } else if (request.url.startsWith('/eliminar?archivo=')) {
    console.log(params);
    const { archivo } = params;
    // 5. Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los
    // parámetros de la consulta recibida.
    fs.unlink(`files/${archivo}`, (error) => {
      if (error) {
        response.write('Ha ocurrido un error al eliminar el archivo');
        return response.end();
      }

      response.write('Archivo eliminado');
      response.end();
    });
  } else {
    response.write('404 not found');
    response.end();
  }
})

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// 6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
// recibida.