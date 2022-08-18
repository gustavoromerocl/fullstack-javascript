const axios = require('axios');
const moment = require('moment');

const urlUser = 'https://randomuser.me/api/';
const urlHolidays = 'https://api.victorsanmartin.com/feriados/en.json';

const getData = async (url) => await axios.get(url);

const getUser = async () => {
  const { data } = await getData(urlUser);
  const { title, first, last } = data.results[0].name;
  return {
    name: `${title} ${first} ${last}`,
    birthday: moment(data.results[0].dob.date).format('MMM Do')
  };
/*   return {
    name: `${title} ${first} ${last}`,
    birthday: moment('1994-01-01T06:09:46.182Z').format('MMM Do')
  }; */
};

const getHolidays = async () => {
  const { data } = await getData(urlHolidays);
  return data.data;
};

/* const getValidate = async () => {
  Promise.all([getUser(), getHolidays()])
    .then(() => {
      // Validate
    })
    .catch(console.log);

}; */

const getValidate = async () => {
  try {
    const [user, holidays] = await Promise.all([getUser(), getHolidays()]);
    const objHoliday = holidays.find(({ date }) => moment(date).format('MMM Do') === user.birthday);
    objHoliday
      ? console.log(`${user.name} nacio el feriado de ${objHoliday.title}`)
      : console.log('Usted no esta de cumpleaños un feriado...');
  } catch (error) {
    console.log(error);
  }
};

getValidate();
