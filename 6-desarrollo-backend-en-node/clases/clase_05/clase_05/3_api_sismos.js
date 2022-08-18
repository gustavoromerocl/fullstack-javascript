const axios = require('axios');

const url = 'https://api.gael.cloud/general/public/sismos';

const getSismos = async () => {
  const { data } = await axios.get(url);
  return {
    fecha: data[0].Fecha,
    magnitud: data[0].Magnitud
  };
};

const imp = ({ fecha, magnitud }) =>
  console.log(`El ultimo sismo fue el ${fecha} y tuvo una magnitud de ${magnitud} Ml.`);

getSismos()
  .then(imp)
  .catch(console.log);
