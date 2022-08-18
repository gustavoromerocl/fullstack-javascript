const child_process = require("child_process")
// 5. Ejecutar la aplicación desde un archivo externo con el módulo child_process
// enviando los argumentos correspondientes y devolviendo por consola el contenido
// del archivo luego de que haya sido creado.

const [,,file, ext, indicator, quantity] = process.argv;
// node indicators/index.js [ archivo extension indicador cantidad ]

child_process.exec(`node indicators/index.js ${file} ${ext} ${indicator} ${quantity}`, (err, result) => {
  if (err) return console.log('Ha ocurrido un error en main js');
  console.log(result);
});

