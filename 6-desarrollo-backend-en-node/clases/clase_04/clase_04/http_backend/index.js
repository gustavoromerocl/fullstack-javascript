const http = require('http');
const fs = require('fs');

const port = 3_000;

const server = http.createServer((request, response) => {
  if (request.url === '/') {
    fs.readFile('public/index.html', 'utf8', (err, data) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ code: 404, err }));
        response.end();
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else if (request.url === '/assets/css/style.css') {
    fs.readFile('public/assets/css/style.css', 'utf8', (err, data) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ code: 404, err }));
        response.end();
      }
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.end(data);
    });
  } else if (request.url === '/assets/js/index.js') {
    fs.readFile('public/assets/js/index.js', 'utf8', (err, data) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ code: 404, err }));
        response.end();
      }
      response.writeHead(200, { 'Content-Type': 'text/js' });
      response.end(data);
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ code: 404, message: 'Page not Found' }));
    response.end();
  }
});

server.listen(port, () => {
  console.log(`http://localhost:${port} - PID: ${process.pid}`);
});
