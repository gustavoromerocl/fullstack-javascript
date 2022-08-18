require('dotenv').config();
const { server } = require('./main');
const yargs = require('yargs');

const port = process.env.PORT || 3000;

yargs.command(
  'exec',
  'password para ingresar al server',
  {
    key: {
      describe: 'Argumento que recibe la llave de acceso al server',
      demand: true,
      alias: 'k'
    }
  },
  (argvs) => {
    if (argvs.k.toString() === process.env.SERVER_PASS) {
      return server.listen(port, () => console.log(`listening in port http://localhost:${port}/`));
    }
    console.log("Acceso denegado");
  }
).help().argv;