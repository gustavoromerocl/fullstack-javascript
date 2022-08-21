const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 3_000;

const server = http.createServer((request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    const file = fs.readFileSync('public/index.html', 'utf8');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  } else if (request.url === '/newUser' && request.method === 'POST') {
    let body = '';
    request.on('data', (chunk) => (body += chunk));
    request.on('end', () => {
      body = JSON.parse(body);

      if (!fs.existsSync('data/users.json')) {
        fs.writeFileSync('data/users.json', JSON.stringify({ users: [] }));
      }

      const file = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

      const data = file.users.find((u) => u.user === body.user);

      let message = 'Usuario ya existe';
      if (!data) {
        file.users.push(body);
        fs.writeFileSync('data/users.json', JSON.stringify(file));
        message = 'Usuario creado';
      }

      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 201, message }));
    });
  } else if (request.url === '/user' && request.method === 'GET') {
    if (!fs.existsSync('data/users.json')) {
      fs.writeFileSync('data/users.json', JSON.stringify({ users: [] }));
    }
    const file = fs.readFileSync('data/users.json', 'utf8');
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(file);
  } else if (request.url === '/user' && request.method === 'PUT') {
    let body = '';
    request.on('data', (chunk) => (body += chunk));
    request.on('end', () => {
      body = JSON.parse(body);

      if (!fs.existsSync('data/users.json')) {
        fs.writeFileSync('data/users.json', JSON.stringify({ users: [] }));
      }
      const file = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));
      file.users.find((u) => (u.user === body.user ? (u.pass = body.pass) : false));

      fs.writeFileSync('data/users.json', JSON.stringify(file));

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 200, message: 'Usuario actualizado.' }));
    });
  } else if (request.url.startsWith('/user?') && request.method === 'DELETE') {
    const params = url.parse(request.url, true).query;
    if (!fs.existsSync('data/users.json')) {
      fs.writeFileSync('data/users.json', JSON.stringify({ users: [] }));
    }
    const file = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));
    const data = file.users.filter((u) => u.user !== params.user);
    fs.writeFileSync('data/users.json', JSON.stringify({ users: data }));
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ code: 200, message: 'Usuario eliminado.' }));
  } else {
    response.writeHead(404, { 'Conten-Type': 'application/json' });
    response.write(JSON.stringify({ code: 404, message: '404 Page not Found' }));
    response.end();
  }
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = server;
