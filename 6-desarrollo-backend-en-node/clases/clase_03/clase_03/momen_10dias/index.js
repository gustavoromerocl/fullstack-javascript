const moment = require('moment');

const fecha = moment().add(10, 'days').format('dddd');
console.log(fecha);
