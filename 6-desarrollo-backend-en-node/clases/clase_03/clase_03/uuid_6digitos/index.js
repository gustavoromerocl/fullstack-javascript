const { v4: uuidv4 } = require('uuid');

const valor = uuidv4();

console.log(valor);
console.log(valor.slice(0, 30));
console.log(valor.slice(-6));
