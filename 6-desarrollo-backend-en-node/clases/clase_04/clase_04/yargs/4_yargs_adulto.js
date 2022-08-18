const yargs = require('yargs');

yargs.command(
  'adulto',
  'Metodo que valida la edad de una persona para saber si es adulto o no...',
  {
    edad: {
      describe: 'Argumento que solicita la edad de una persona...',
      demand: true,
      alias: 'e'
    }
  },
  (argumentos) => {
    argumentos.edad >= 18
      ? console.log('Usted es mayor de edad')
      : console.log('Usted es menor de edad')
  }
).help().argv;
