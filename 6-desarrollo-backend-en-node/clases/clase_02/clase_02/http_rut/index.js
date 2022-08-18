const http = require('http');
const url = require('url');

const port = 3000;
const users = [
  {
    rut: '1-9',
    name: 'Raul',
    lastname: 'Farias',
    age: 34,
    email: 'rfarias@rfarias.cl'
  },
  {
    rut: '1-7',
    name: 'Daniela',
    lastname: 'Saavedra',
    age: 20,
    email: 'daniela@saavedra.cl'
  }
];

const server = http.createServer((request, response) => {
  const params = url.parse(request.url, true).query;

  if (request.url.startsWith('/user?rut=')) {
    const rut = params.rut;
    const user = users.find((u) => u.rut === rut);
    user ? response.write(JSON.stringify(user)) : response.write('Usuario no encontrado...');
  }

  response.end();
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
