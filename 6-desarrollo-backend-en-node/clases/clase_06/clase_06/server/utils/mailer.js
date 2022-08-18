require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

/* transporter
  .verify()
  .then(console.log)
  .catch(console.log); */

const enviar = async ({ to, subject, text}) => {
  return await transporter.sendMail({
    from: `My Empresa <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
    html: `<h1 style="color: red;">HTML:${text}</h1>`
  });
};

module.exports = { enviar };
