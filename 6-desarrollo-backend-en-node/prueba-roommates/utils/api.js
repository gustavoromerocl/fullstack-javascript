const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const RANDOM_USER_URL = 'https://randomuser.me/api'

const fetchData = async (url) => {
  const data = await axios.get(url);

  return data;
}

const fetchUsers = async () => {
  const { data } = await fetchData(RANDOM_USER_URL);
  const { results } = data;
  const uuid = uuidv4();

  const { first, last } = results[0].name;

  return {
    uuid,
    email: results[0].email,
    nombre: `${first} ${last}`,
    debe: 0,
    recibe: 0
  };
}

module.exports = { fetchUsers };
