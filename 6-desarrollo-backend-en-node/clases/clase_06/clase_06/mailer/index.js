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

transporter
  .sendMail({
    from: `Desafio Latam G17 <${process.env.MAIL_USER}>`,
    to: 'raulfaria@gmail.com',
    subject: 'Test desde NodeMailer x3',
    text: 'Este es un mensaje de Test desde NodeMailer x3'
  })
  .then(console.log)
  .catch(console.log);
