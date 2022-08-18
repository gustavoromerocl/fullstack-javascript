require('dotenv').config();

const http = require('http');
const url = require('url');
const fs = require('fs');
const { send } = require('./utils/mailer.js');

const port = process.env.SERVER_PORT || 3000;
// 1. Usar el paquete nodemailer para el envío de correos electrónicos. -> npm install nodemailer

const server = http.createServer((request, response) => {
  const params = url.parse(request.url, true).query;

  if (request.url === '/') {
    fs.readFile('public/index.html', 'utf8', (err, file) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ status: 404, message: 'Error en index.html', err }));
        return response.end();
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    });
  } else if (request.url === '/assets/js/main.js') {
    fs.readFile('public/assets/js/main.js', 'utf8', (err, file) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ status: 404, message: 'Error en main.js', err }));
        return response.end();
      }

      response.writeHead(200, { 'Content-Type': 'text/js' });
      response.end(file);
    });
  } else if (request.url.startsWith('/mailing?')) {
    // 4. Enviar un mensaje de éxito o error por cada intento de envío de correos electrónicos
    send(params).then((result) => {
      //       5. Cada correo debe ser almacenado como un archivo con un nombre identificador
      // único en una carpeta “correos”. Usar el paquete UUID para esto.
      fs.writeFile(
        `correos/${result.messageId.replace('@outlook.com', '').replace('<', '').replace('>')}.json`, 
        JSON.stringify(result), 'utf-8', 
        (err) => {
        if (err) {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify({ status: 404, message: 'Error al guardar el correo', err }));
          return response.end();
        }
      })
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ status: 200, message: 'Correo enviado.', result }));
      response.end();
    })
      .catch((error) => {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ status: 404, message: 'Error al enviar el correo.', error }));
        response.end();
      })
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ status: 404, message: 'Page not Found' }));
    response.end();
  }
});

server.listen(port, () => {
  console.log(`http://locahost:${port} - PID: ${process.pid}`)
})