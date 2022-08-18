const axios = require('axios');

const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
}

module.exports = { fetchData };