const http = require('http');
const fs = require('fs');
const url = require('url');

const { insertar, leer, actualizar, eliminar } = require('./pg.js');

const port = 3_000;

const server = http.createServer(async (request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    const file = fs.readFileSync('public/index.html', 'utf8');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  } else if (request.url === '/cancion' && request.method === 'POST') {
    let body = '';
    request.on('data', (chunk) => body += chunk);
    request.on('data', async () => {
      const data = JSON.parse(body);
      const result = await insertar(Object.values(data));
      response.writeHead(result?.code ? 500 : 201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(result));
    });
  } else if (request.url === '/canciones' && request.method === 'GET') {
    const result = await leer();
    response.writeHead(result?.code ? 500 : 201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result));
  } else if (request.url === '/cancion' && request.method === 'PUT') {
    let body = '';
    request.on('data', (chunk) => body += chunk);
    request.on('end', async () => {
      const data = JSON.parse(body);
      console.log(Object.values(data));
      const result = await actualizar(Object.values(data));
      response.writeHead(result?.code ? 500 : 200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(result));
    });
  } else if (request.url.startsWith('/cancion?id=') && request.method === 'DELETE') {
    const { id } = url.parse(request.url, true).query;
    const result = await eliminar([id]);
    response.writeHead(result?.code ? 500 : 200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result));
  }
  else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: 404, message: 'Page not Found!!!' }));
  }
});

server.listen(port);

module.exports = server;