const http = require('http');
const fs = require('fs');
const url = require('url');
const { fetchUsers } = require('./utils/api');
const { v4: uuidv4 } = require('uuid');
const { removerGastos, agregarGastos } = require('./utils/gastos');

const port = 3000;

const server = http.createServer((request, response) => {
  try {
    const roommatesData = JSON.parse(fs.readFileSync('data/roommates.json'));

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
    } else if (request.url === '/roommates' && request.method === 'GET') {
      if (!fs.existsSync('data/roommates.json')) {
        fs.writeFileSync('data/roommates.json', JSON.stringify({ roommates: [] }))
      }
  
      const file = fs.readFileSync('data/roommates.json', 'utf-8');
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(file);
    } else if (request.url === '/gasto' && request.method === 'POST') {
      let body = '';
      request.on('data', (chunk) => (body += chunk))
      request.on('end', () => {
        body = JSON.parse(body);
  
        if (!fs.existsSync('data/gastos.json')) {
          fs.writeFileSync('data/gastos.json', JSON.stringify({ gastos: [] }));
        }
  
        const file = JSON.parse(fs.readFileSync('data/gastos.json', 'utf8'));
        // Dividir gasto en la cantidad de roommates
        console.log("GASTO",body.monto);
        const { roommates } = roommatesData; 

        //Actualizar rommates
        const updateRoommates = agregarGastos(roommates, body);

        const gasto = {
          id: uuidv4(),
          ...body
        }
  
        let message = 'Gasto ingresado';
  
        file.gastos.push(gasto);
  
        fs.writeFileSync('data/roommates.json', JSON.stringify({ roommates: updateRoommates }));
        fs.writeFileSync('data/gastos.json', JSON.stringify(file));
        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ code: 201, message }));
      })
    } else if (request.url === '/gastos' && request.method === 'GET') {
      if (!fs.existsSync('data/gastos.json')) {
        fs.writeFileSync('data/gastos.json', JSON.stringify({ gastos: [] }))
      }
  
      const file = fs.readFileSync('data/gastos.json', 'utf-8');
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(file);
    } else if (request.url.startsWith('/gasto?') && request.method === 'PUT') {
      let body = '';
      request.on('data', (chunk) => (body += chunk));
      request.on('end', () => {
        body = JSON.parse(body);
  
        const params = url.parse(request.url, true).query;

        if (!fs.existsSync('data/gastos.json')) {
          fs.writeFileSync('data/gastos.json', JSON.stringify({ gastos: [] }));
        }
  
        const file = JSON.parse(fs.readFileSync('data/gastos.json', 'utf8'));

        const index = file.gastos.findIndex((el) => el.id === params.id);
  
        const { roommate, descripcion, monto } = body;
        const { roommates } = roommatesData; 
        //Validamos que se actualizó el monto
        if(file.gastos[index].monto !== monto) {
          let borraGasto = removerGastos(roommates, file.gastos,file.gastos[index].id);
          let agregarGasto = agregarGastos(borraGasto, body);

          fs.writeFileSync('data/roommates.json', JSON.stringify({ roommates: agregarGasto }));
        }
  
        file.gastos[index].roommate = roommate;
        file.gastos[index].descripcion = descripcion;
        file.gastos[index].monto = monto;


  
        fs.writeFileSync('data/gastos.json', JSON.stringify(file));
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ code: 200, message: 'Gasto actualizado.' }));
      })
  
    } else if (request.url.startsWith('/gasto?') && request.method === 'DELETE') {
      const params = url.parse(request.url, true).query;
  
      if (!fs.existsSync('data/gastos.json')) {
        fs.writeFileSync('data/gastos.json', JSON.stringify({ gastos: [] }));
      }
      console.log(params);
      const file = JSON.parse(fs.readFileSync('data/gastos.json', 'utf8'));
  
      const newFile = file.gastos.filter((el) => el.id !== params.id);
      //Actualizar gastos en roomates
      const { roommates } = roommatesData; 
      const updateRoommates = removerGastos(roommates, file.gastos, params.id);
  
      fs.writeFileSync('data/roommates.json', JSON.stringify({ roommates: updateRoommates }));
      fs.writeFileSync('data/gastos.json', JSON.stringify({ gastos: newFile }));
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ code: 200, message: 'Gasto eliminado.' }));
    } else {
      response.writeHead(404, { 'Conten-Type': 'application/json' });
      response.write(JSON.stringify({ code: 404, message: '404 Page not Found' }));
      response.end();
    }
  } catch(error) {
    console.log(error)
  }
});

server.listen(port, () => console.log(`listening in http://localhost:${port} PID=${process.pid}`));

