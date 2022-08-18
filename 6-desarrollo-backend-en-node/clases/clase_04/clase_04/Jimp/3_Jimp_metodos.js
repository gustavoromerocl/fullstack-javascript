const http = require('http');
const Jimp = require('jimp');

const port = 3_000;
const urlImg =
  'https://static.wikia.nocookie.net/dragonball/images/c/c0/Son_Goku_en_Super_Hero.png/revision/latest?cb=20220302091733&path-prefix=es';

const server = http.createServer((request, response) => {
  Jimp.read(urlImg, (err, img) => {
    if (err) {
      response.write('No se puede leer la img.');
      return response.end();
    }
    img
      .resize(100, Jimp.AUTO)
      .grayscale()
      .quality(60)
      .getBase64(Jimp.MIME_JPEG, (err, src) => {
        if (err) {
          response.write('No se puede procesar la respuesta...');
          return response.end();
        }
        response.writeHead(200, { 'Content-Type' : 'text/html' });
        response.write(`<img src="${src}" alt="Img de goku procesada">`);
        response.end();
      });
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
