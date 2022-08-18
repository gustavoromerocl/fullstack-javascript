const http = require('http');
const fs = require('fs');
const { fetchPokemons } = require('./utils/pokeapi')

const port = 3000;

const server = http.createServer((request, response) => {

  if (request.url === '/') {
    fs.readFile('public/index.html', 'utf-8', (err, file) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ status: 404, message: 'Error en index.html', err }));
        return response.end();
      };
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    });
  } else if (request.url === '/pokemones') {
    fetchPokemons()
      .then( result => {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(result));
        response.end();
      })
      .catch(console.log)
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ status: 404, message: 'Page not Found' }));
    response.end();
  }
});

server.listen(port, () => console.log(`http://localhost:${port} - PID: ${process.pid}`));