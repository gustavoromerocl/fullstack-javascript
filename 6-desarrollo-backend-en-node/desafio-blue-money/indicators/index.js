const https = require('https');
const fs = require('fs');

// 1. Recibir por la línea de comando los siguientes argumentos:
// a. Nombre del archivo que se creará.
// b. Extensión del archivo.
// c. Indicador económico que se desea convertir.
// d. Cantidad de pesos que se quiere cambiar.

const [fileName, extFile, indicator, quantity] = process.argv.slice(2);

//node indicators/index.js [ archivo extension indicador cantidad ]

//2. Consultar la API con el módulo https y almacenar la respuesta en una variable.

const url = 'https://mindicador.cl/api';

const request = https.get(url, (response) => {
  let data = '';

  response.on('data', chunk => data += chunk);
  response.on('end', () => {
    //  3. Crear un archivo con el módulo fs cuyos datos están formados por los argumentos
    // recibidos por línea de comando y su contenido basado en el template de la
    // descripción.
    const values = JSON.parse(data);



    const template = convertTo(values);

    if (!template) return console.log('El indicador no se puede convertir a un valor válido')

    fs.writeFile(`${fileName}.${extFile}`, template, 'utf-8', (err) => {
      if (err) {
        return console.log('ha ocurrido un error al crear el archivo');
      }

      // 4. Enviar por consola el contenido del archivo luego de que haya sido creado.
      fs.readFile(`${fileName}.${extFile}`, 'utf-8', (err, file) => {
        if (err) {
          return console.log('ha ocurrido un error al leer el archivo');
        }

        console.log(file);
      })
    });


  });
});


function convertTo(values) {
  const currentIndicator = values[indicator];
  let result = 0;

  if (!currentIndicator) return false;
  if (currentIndicator.unidad_medida === 'Porcentaje') return false;

  if (currentIndicator.unidad_medida === 'Pesos') result = quantity / currentIndicator.valor;
  if (currentIndicator.unidad_medida === 'Dólar') result = (quantity / values['dolar'].valor) / currentIndicator.valor;  

  return `
  A la fecha: ${new Date()}
  Fue realizada cotización con los siguientes datos:
  Cantidad de pesos a convertir: ${quantity} pesos
  Convertido a ${indicator} da un total de:
  $${result}
`
}

request.end();

