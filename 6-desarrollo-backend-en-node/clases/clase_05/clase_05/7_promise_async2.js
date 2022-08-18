const promesa1 = async () => 1;
const promesa2 = async () => 2;

Promise.all([promesa1(), promesa2()])
  .then((results) => {
    const suma = results.reduce((ac, cv) => ac + cv, 0);
    console.log(`La suma de los numeros es: ${suma}`);
  })
  .catch(console.log);
