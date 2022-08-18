const https = require('https');

const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

const request = https.get(url, (response) => {
  console.log('statusCode: ', response.statusCode);
  let data = '';
  response.on('data', (chunk) => data += chunk);
  response.on('end', () => {
    console.log(JSON.parse(data));
  });
});

request.on('error', console.log);
request.end();
