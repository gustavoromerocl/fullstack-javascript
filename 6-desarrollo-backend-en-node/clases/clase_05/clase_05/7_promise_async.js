/* const promesaNormal = () => {
  return new Promise((resolve, reject) => {
    return resolve('Nombre');
  });
};

const promesaNormalCorta = () => new Promise((resolve, reject) => resolve('Nombre'));

const promesaAsyncNormal = async () => {
  return 'Nombre';
};

const promesaAsyncCorta = async () => 'Nombre'; */

const firstName = async () => 'Raul';
const lastName = async () => 'Farias';

Promise.all([firstName(), lastName()])
  .then(([nombre, apellido]) => console.log(`Hola ${nombre} ${apellido}`))
  .catch(console.log);
