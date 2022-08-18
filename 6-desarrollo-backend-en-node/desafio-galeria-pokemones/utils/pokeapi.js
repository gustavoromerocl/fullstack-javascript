const axios = require('axios');

const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151'
// 1. Hacer uso de Async/Await para las funciones que consulten los endpoints de la
// pokeapi.
const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

// 2. Usar el Promise.all() para ejecutar y obtener la data de las funciones asíncronas
// generando un nuevo arreglo con la data a entregar en el siguiente requerimiento.
const fetchPokemons = async () => {
  const { results: pokemonsList } = await fetchData(baseUrl);

  const promisesList = pokemonsList.map(({ url }) => fetchData(url));
  const pokeData = await Promise.all(promisesList);

  return pokeData.map(({ name, sprites }) => ({ img: sprites.front_default, nombre: name }));
}

module.exports = { fetchPokemons };