const http = require('http');

const port = 3_000;

const server = http.createServer((request, response) => {
  response.end();
});

server.listen(port, () => {
  console.log(`http://localhost:${port} - PID: ${process.pid}`);
});
