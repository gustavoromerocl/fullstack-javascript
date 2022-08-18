require('dotenv').config();
const http = require('http');
const fs = require('fs');
const url = require('url');
const Jimp = require('jimp');

const server = http.createServer((request, response) => {
  const params = url.parse(request.url, true).query;
  // 2. El servidor debe disponibilizar una ruta raíz que devuelva un HTML con el formulario
  // para el ingreso de la URL de la imagen a tratar.

  if (request.url === '/') {
    fs.readFile('public/index.html', 'utf-8', (err, file) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ status: 404, message: 'Error en index.html', err }));
        return response.end();
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    })
    //     3. Los estilos de este HTML deben ser definidos por un archivo CSS alojado en el
    // servidor.
  } else if (request.url === '/assets/css/main.css') {
    fs.readFile('public/assets/css/main.css', 'utf-8', (err, file) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ status: 404, message: 'Error en main.css', err }));
        return response.end();
      }

      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.end(file);
    })
    //     4. El formulario debe redirigir a otra ruta del servidor que deberá procesar la imagen
    // tomada por la URL enviada del formulario con el paquete Jimp. La imagen debe ser
    // procesada en escala de grises, con calidad a un 60% y redimensionada a unos 350px
    // de ancho. Posteriormente debe ser guardada con nombre “newImg.jpg” y devuelta al
    // cliente.
  } else if (request.url.startsWith('/upload?')) {
    const { url } = params;

    Jimp.read(url, (err, img) => {
      if (err) {
        response.write('No se ha podido cargar la imagen');
        response.end();
      }

      img
        .resize(350, Jimp.AUTO)
        .grayscale()
        .quality(60)
        .getBase64(Jimp.MIME_JPEG, (err, src) => {
          if (err) {
            response.write('No se puede procesar la respuesta...');
            return response.end();
          }

          img.writeAsync('newImg.jpg');
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.write(`<img src="${src}" alt="iamgen de salem">`);
          response.end();
        });

    })
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ status: 404, message: 'Page not Found' }));
    response.end();
  }
});

module.exports = { server };