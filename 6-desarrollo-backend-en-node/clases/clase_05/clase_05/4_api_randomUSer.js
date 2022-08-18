const axios = require('axios');
const moment = require('moment');

const url = 'https://randomuser.me/api/';

const getUser = async () => {
  const { data } = await axios.get(url);
  const { title, first, last} = data.results[0].name;
  return {
    name: `${title} ${first} ${last}`,
    nacimiento: moment(data.results[0].dob.date).format('MMMM Do YYYY, h:mm:ss a')
  };
};

const print = ({ name, nacimiento }) => {
  console.log(`Hola ${name} tu estas de cumpleaños el ${nacimiento}`);
};

getUser()
  .then(print)
  .catch(console.log);

/* getUser()
  .then((user) => {
    print(user);
  })
  .catch((err) => {
    console.log(err);
  }); */
