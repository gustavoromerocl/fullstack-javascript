const yargs = require('yargs');

yargs.command(
  'PING',
  'Comando para retornar un mensaje de PONG.',
  {
    numero: {
      describe: 'Recive un numero y retorna un PONG concatenado con el numero.',
      demand: true,
      alias: '-n'
    }
  },
  (argvs) => {
    console.log(`PONG ${argvs.numero}`);
  }
).help().argv;
