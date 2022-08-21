const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 3_000;

const server = http.createServer((request, response) => {
  if (request.url.startsWith('/nuevoUsuario?')) {
    const params = url.parse(request.url, true).query;
    fs.writeFileSync('json/usuario.json', JSON.stringify(params));
    response.end();
  } else if (request.url.startsWith('/nuevoJuego?')) {
    const params = url.parse(request.url, true).query;
    fs.writeFileSync('json/juegos.json', JSON.stringify(params));
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ code: 404, message: 'Page not Found' }));
    response.end();
  }
});

server.listen(port, () => {
  console.log(`http://localhost:${port} - PID: ${process.pid}`);
});
