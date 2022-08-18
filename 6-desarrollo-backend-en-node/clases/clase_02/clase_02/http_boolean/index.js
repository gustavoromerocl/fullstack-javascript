const http = require('http');
const url = require('url');

const port = 3000;
let booleanLocal = false;

const server = http.createServer((request, response) => {
  const params = url.parse(request.url, true).query;

  if (request.url.startsWith('/switch?boolean=')) {
    booleanLocal = params.boolean === 'true' ? true : false;
    booleanLocal ? response.write('ON') : response.write('OFF');
  }

  response.end();
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
