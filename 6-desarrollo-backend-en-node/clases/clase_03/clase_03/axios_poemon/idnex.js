const axios = require('axios');
const chalk = require('chalk');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

const api = async () => {
  try {
    const { data } = await axios.get(url);
    const response = {
      id: uuidv4(),
      fecha: moment().format('MMM Do YY'),
      name: data.name
    };
    console.log(response);
  } catch (error) {
    console.log(chalk.bgRed.white(`${error.response.status} - ${error.response.data}`));
  }
};

api();
