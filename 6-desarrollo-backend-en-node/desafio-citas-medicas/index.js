const http = require('http');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const axios = require('axios').default;
const _ = require('lodash');
const chalk = require('chalk');


const port = 8080;
const users = [];
let count = 1;

//     1. El registro de los usuarios debe hacerse con la API Random User usando axios para
// consultar la data.

//     2. Cada usuario registrado debe tener un campo id único generado por el paquete
// UUID.

// const uuid = uuidv4();

//     3. Cada usuario debe tener un campo timestamp almacenando la fecha de registro
// obtenida por medio del paquete Moment.

// const timestamp = moment().toString();

//     nombre, apellido, hora en la que fue registrado e indispensablemente un código
// identificador.

const server = http.createServer((request, response) => {
  if (request.url === '/create-user') {

    axios.get('https://randomuser.me/api/?inc=name')
      .then(res => {
        const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');;
        const uuid = uuidv4();
        const nombre = res.data.results[0].name.first;
        const apellido = res.data.results[0].name.last;

        const data = [count, nombre, apellido, uuid, timestamp];
        const user = _.toString(data)
        
        users.push(user)

        response.write(_.toString(user));
        console.log(chalk.bgWhite.blue(user));
        
        count++;
        response.end();
      })
      .catch(err => console.log(err));

  } else if (request.url === '/list-users') {

    //     4. Por cada consulta realizada al servidor, se debe devolver al cliente una lista con los
    // datos de todos los usuarios registrados usando Lodash para recorrer el arreglo de
    // usuarios.


    response.write(_.toString(users));
    console.log(chalk.bgWhite.blue(users));

    response.end();
  } else {
    response.write('404 Not found');
    response.end();
  }
});

server.listen(port, () => {
  console.log(`Listening in port ${port}`)
});

//6. El servidor debe ser levantado con el comando Nodemon.