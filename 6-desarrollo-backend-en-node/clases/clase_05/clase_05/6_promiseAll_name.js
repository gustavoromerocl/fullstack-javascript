const promesa1 = () => {
  return new Promise((resolve, reject) => {
    return resolve('Daniela');
  });
};

const promesa2 = () => {
  return new Promise((resolve, reject) => {
    return resolve('Saavedra');
  });
};

/* Promise.all([promesa1(), promesa2()])
  .then((results) => {
    console.log(`Hola ${results[0]} ${results[1]}`);
  })
  .catch(console.log); */

Promise.all([promesa1(), promesa2()])
  .then(([nombre, apellido]) => {
    console.log(`Hola ${nombre} ${apellido}`);
  })
  .catch(console.log);
