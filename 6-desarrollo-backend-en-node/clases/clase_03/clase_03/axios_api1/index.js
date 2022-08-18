const axios = require('axios');

const url = 'https://rickandmortyapi.com/api/character/1_';

const api = async () => {
  try {
    const { data } = await axios.get(url);
    console.log(data.name);
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data
    });
  }
};

api();
