const http = require('http');

const port = 3000;
const server = http.createServer((request, response) => {
  if (request.url === '/saludo') {
    response.write('Hola! ¿Cómo estás?');
  }
  response.end();
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
