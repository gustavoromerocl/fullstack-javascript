const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const valor = {
  fecha: moment().add(10_000, 'days').format('MMM Do YY'),
  id: uuidv4()
};

console.log(valor);
