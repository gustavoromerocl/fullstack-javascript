const http = require('http');

const port = 8080;

const server = http.createServer((request, response) => {
  console.log('Hemos accedido al servidor...');
  response.end();
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});


