const promesa1 = () => new Promise((resolve) => resolve(1));
const promesa2 = () => new Promise((resolve) => resolve(2));

Promise.all([promesa1(), promesa2()])
  .then((results) => {
    const suma = results.reduce((ac, cv) => ac + cv, 0);
    console.log(suma);
  })
  .catch(console.log);
