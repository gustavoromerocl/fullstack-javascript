const axios = require('axios');

const getData = async (url) => await axios.get(url);

const getUser = async () => {
  const { data } = await getData('https://randomuser.me/api/');

  const {
    name: { first, last },
    email,
    login: { password }
  } = data.results[0];

  return {
    nombre: first,
    apellido: last,
    email,
    password
  };
};

module.exports = getUser;
