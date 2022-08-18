const _ = require('lodash');

const valores = [true, 0, null, undefined, '', 22, false];
const newArray = _.partition(valores, (valor) => valor);

console.table(newArray);
