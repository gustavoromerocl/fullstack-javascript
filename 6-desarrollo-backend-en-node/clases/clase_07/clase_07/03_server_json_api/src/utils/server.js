const http = require('http');
const fs = require('fs');

const getUser = require('./randomuser.js');

const port = process.env.PORT || 3_000;

const server = http.createServer(async (request, response) => {
  if (request.url === '/addUser') {

    const user = await getUser();

    if (!fs.existsSync('src/json/users.json')) {
      fs.writeFileSync('src/json/users.json', JSON.stringify({ users: [] }));
    }

    const file = JSON.parse(fs.readFileSync('src/json/users.json', 'utf8'));
    file.users.push(user);

    fs.writeFileSync('src/json/users.json', JSON.stringify(file));

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ code: 201, message: 'User add...'}));
    response.end();
  } else if (request.url === '/viewUsers') {
    if (!fs.existsSync('src/json/users.json')) {
      fs.writeFileSync('src/json/users.json', JSON.stringify({ users: [] }));
    }

    const file = fs.readFileSync('src/json/users.json', 'utf8');

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(file);
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ code: 404, message: 'Page not Found' }));
    response.end();
  }
});

server.listen(port, () => {
  console.log(`http://localhost:${port} - PID: ${process.pid}`);
});

module.exports = server;
