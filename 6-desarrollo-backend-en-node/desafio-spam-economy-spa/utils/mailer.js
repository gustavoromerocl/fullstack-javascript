require('dotenv').config();
const nodemailer = require('nodemailer');
const { fetchData } = require('./api');

// 1. Usar el paquete nodemailer para el envío de correos electrónicos.

const url = 'https://mindicador.cl/api';

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const template = (text, data) => `
  ${text}:
  <p>El valor del dolar el día de hoy es: ${data.dolar.valor}</p>
  <p>El valor del euro el día de hoy es: ${data.euro.valor}</p>
  <p>El valor de la uf el día de hoy es: ${data.uf.valor}</p>
  <p>El valor de la utm el día de hoy es: ${data.utm.valor}</p>
`;

// 2. Crear una función que reciba la lista de correos, asunto y contenido a enviar. Esta función debe retornar una promesa.
const send = async ({ correos, asunto, contenido }) => {
  // 3. Realizar una petición a la api de mindicador.cl y preparar un template que incluya los
  // valores del dólar, euro, uf y utm. Este template debe ser concatenado al mensaje
  // descrito por el usuario en el formulario HTML.
  const data = await fetchData(url);


  return await transporter.sendMail({
    from: `SPAM ECONOMY SPA <${process.env.MAIL_USER}>`,
    to: correos,
    subject: asunto,
    html: template(contenido, data)
  });
};

module.exports = { send };