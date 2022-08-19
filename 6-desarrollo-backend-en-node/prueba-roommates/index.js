const http = require('http');
const fs = require('fs');
const { fetchUsers } = require('./api');
const port = 3000;

const server = http.createServer((request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    const file = fs.readFileSync('public/index.html', 'utf8');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  } else if (request.url === '/roommate' && request.method === 'POST') {
    // let body = '';
    request.on('data', (chunk) => (body += chunk));
    request.on('end', async () => {
      // body = JSON.parse(body);
      const roommate = await fetchUsers();

      if (!fs.existsSync('data/roommates.json')) {
        fs.writeFileSync('data/roommates.json', JSON.stringify({ roommates: [] }));
      }

      let message = 'Usuario creado';

      const file = JSON.parse(fs.readFileSync('data/roommates.json', 'utf-8'))
      
      file.roommates.push(roommate);

      fs.writeFileSync('data/roommates.json', JSON.stringify(file));
      
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 201, message }));
    })
  } else {
    response.writeHead(404, { 'Conten-Type': 'application/json' });
    response.write(JSON.stringify({ code: 404, message: '404 Page not Found' }));
    response.end();
  }

});

server.listen(port, () => console.log(`listening in http://localhost:${port}`));