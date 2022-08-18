const http = require('http');

const port = 3000;
const server = http.createServer((request, response) => {

  if (request.url === '/date') {
    console.log(new Date());
    response.write(`${new Date()}`);
  }

  response.end();
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
