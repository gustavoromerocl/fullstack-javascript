const yargs = require('yargs');
const child_process = require('child_process');

yargs.command(
  'area51',
  'Valida el ingreso al area 51.',
  {
    password: {
      describe: 'Argumento que recibe la contraseña de acceso',
      demand: true,
      alias: 'p'
    }
  },
  (argvs) => {
    if (argvs.p === 123456) {
      return child_process.exec('node 3_yargs_saludo.js', (err, result) => {
        if (err) {
          return console.log('Ha ocurrido un error al leer el archivo.');
        }
        console.log(result.trim());
      });
    }
    console.log('Acceso denegado!!!');
  }
).help().argv;
