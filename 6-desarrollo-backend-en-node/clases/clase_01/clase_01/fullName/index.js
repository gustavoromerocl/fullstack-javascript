const child_process = require('child_process');

const fullName = (file) => {
  return new Promise((resolve, reject) => {
    child_process.exec(`node ${file}`, (err, result) => {
      if (err) {
        reject('Ha ocurrido un error...');
      }
      resolve(String(result).trim());
    });
  });
};

fullName('fullName/firstName.js')
  .then((nombre) => {
    fullName('fullName/lastName.js')
      .then((apellido) => {
        console.log(`${nombre} ${apellido}`);
      })
      .catch(console.log);
  })
  .catch((error) => console.log(error));
