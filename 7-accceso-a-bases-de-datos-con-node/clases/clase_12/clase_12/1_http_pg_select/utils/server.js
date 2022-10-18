const http = require('http');
const { fecha } = require('./pg');

const port = 3_000;

const server = http.createServer(async (request, response) => {
  if (request.url === '/fecha' && request.method === 'GET') {
    const result = await fecha();
    response.writeHead(result?.code ? 500 : 200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result));
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: 404, message: 'Page Not Found!' }));
  }
});

server.listen(port);

module.exports = { server };
