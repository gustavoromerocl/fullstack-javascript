const axios = require('axios');

const urlBase = 'https://pokeapi.co/api/v2/pokemon?limit=151';

const getData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const getPokeDex = async () => {
  const { results: listPokemons } = await getData(urlBase);
  const pokePromises = listPokemons.map(({ url }) => getData(url));
  const pokeDatas = await Promise.all(pokePromises);
  pokeDatas.forEach(({ name, height, weight }) => console.log(`${name} => Alto: ${height} - Peso: ${weight}.`));
};

getPokeDex();
