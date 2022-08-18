const [,, num1, num2] = process.argv;

if (!num1 || !num2) {
  return console.log('Debe ingresar dos nuymeros...');
}

console.log(num1 * num2);
