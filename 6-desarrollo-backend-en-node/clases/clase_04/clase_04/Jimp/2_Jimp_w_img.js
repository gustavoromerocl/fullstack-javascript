const http = require('http');
const Jimp = require('jimp');

const port = 3_000;
const urlImg = 'https://static.wikia.nocookie.net/dragonball/images/c/c0/Son_Goku_en_Super_Hero.png/revision/latest?cb=20220302091733&path-prefix=es';

const server = http.createServer((request, response) => {
  Jimp.read(urlImg, (err, img) => {
    if (err) {
      response.write('No se ha podido leer la img...');
      response.end();
    }
    img
      .grayscale()
      .writeAsync('goku_2.jpg')
      .then(() => {
        response.write('Se ha guardado exitosamente...');
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.write('No se ha podido guardar la img...');
        response.end();
      })

/*       try {
        img.writeAsync('goku_async.jpg');
        response.write('Se ha guardado exitosamente...');
        response.end();
      } catch (error) {
        console.log(error);
        response.write('No se ha podido guardar la img...');
        response.end();
      } */

  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
