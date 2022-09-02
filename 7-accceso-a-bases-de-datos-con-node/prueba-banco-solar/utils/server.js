const http = require('http');
const fs = require('fs');
const url = require('url');
const {
  insertarUsuario,
  listarUsuarios,
  actualizarUsuario,
  desactivarUsuario
} = require('./pg');

const PORT = 3000;

const server = http.createServer(async (request, response) => {
  if (request.url === '/') {
    const file = fs.readFileSync('public/index.html', 'utf8');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  } else if (request.url === '/usuario' && request.method === 'POST') {
    let body = '';
    request.on('data', chunk => body += chunk);
    request.on('end', async () => {
      const data = JSON.parse(body);
      const result = await insertarUsuario(Object.values(data));
      response.writeHead(result?.code ? 500 : 201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(result));
    })
  } else if (request.url === '/usuarios' && request.method === 'GET') {
    const result = await listarUsuarios();
    response.writeHead(result?.code ? 500 : 200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result));
  } else if (request.url.startsWith('/usuario?id') && request.method === 'PUT') {
    const { id } = url.parse(request.url, true).query;
    let body = '';
    request.on('data', (chunk) => body += chunk);
    request.on('end', async () => {
      const data = JSON.parse(body);
      let payload = [...Object.values(data), id];
      const result = await actualizarUsuario(payload);
      response.writeHead(result?.code ? 500 : 200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(result));
    });
  } else if (request.url.startsWith('/usuario?id') && request.method === 'DELETE') {
    const { id } = url.parse(request.url, true).query;
    const result = await desactivarUsuario([false, id]);
    response.writeHead(result?.code ? 500 : 200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result));
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: 404, message: 'Page not Found' }));
  }
});

server.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT} - PID: ${process.pid}`));

module.exports = { server }