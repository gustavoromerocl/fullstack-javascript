const yargs = require('yargs');

yargs.command(
  'saludo',
  'Comando para saludar...',
  {
    nombre: {
      describe: 'Recibe un nombre en formato String',
      demand: true,
      alias: 'n'
    }
  },
  (argvs) => {
    console.log(`Hola, como estas ${argvs.nombre}`);
  }
).help().argv;
