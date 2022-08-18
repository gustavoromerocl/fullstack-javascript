const child_process = require('child_process');

const ejecutar = (file) => {
  return new Promise((resolve, reject) => {
    child_process.exec(`node ${file}`, (err, result) => {
      if (err) {
        reject('Ha ocurrido un error...');
      }
      resolve(Number(result));
    });
  });
};

/* ejecutar('child_process/num1.js')
  .then((numero) => { console.log(numero);})
  .catch((error) => { console.log(error);}); */

/* ejecutar('child_process/num1_.js')
  .then(console.log)
  .catch(console.log); */

ejecutar('child_process/num1.js')
  .then((n1) => {
    ejecutar('child_process/num2.js')
      .then((n2) => {
        console.log(n1 + n2);
      })
      .catch(console.log);
  })
  .catch(console.log);
