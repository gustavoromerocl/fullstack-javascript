const https = require('https');

const url = 'https://api.gael.cloud/general/public/clima';

const request = https.get(url, (response) => {
  console.log('statusCode: ', response.statusCode);
  let data = '';
  response.on('data', (chunk) => data += chunk);
  response.on('end', () => {
    // console.log(JSON.parse(data));
    const clima = JSON.parse(data);

    const santiago = clima.filter(({ Codigo }) => Codigo == 'SCQN');
    console.log(santiago);

    const despejado = clima.filter(({ Estado }) => Estado == 'Despejado');
    console.log(despejado);
  });
});

request.on('error', console.log);
request.end();
