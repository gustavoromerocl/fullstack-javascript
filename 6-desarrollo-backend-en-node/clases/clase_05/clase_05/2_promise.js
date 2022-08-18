const cb = (resolver, rechazar) => {
  if (Math.random() >= 0.5) {
    return rechazar('Perdiste...');
  }
  setTimeout(() => resolver('Ganaste...'), 5000);
};

const miPromesa = new Promise(cb);

miPromesa
  .then(console.log) // CB
  .catch((err) => { console.log(err); }); // fn CB
