const express = require('express');
const { sign, verify } = require('./jwt');
const { users } = require('./users.json');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/profile', (req, res, next) => {
  const decoded = verify(req.headers.authorization);
  decoded?.code
    ? res.status(401).json({ ...decoded })
    : next();
});

app.post('/login', (req, res) => {
  const { user, paas } = req.body;
  const filtro = users.find((u) => u.user === user && u.pass === paas);

  if (!filtro) {
    return res.status(401).json({ code: 401, message: 'Usted no esta autorizado...' });
  }

  const token = sign({ user });
  res.status(200).json({ jwt: token });
});

app.post('/profile', (req, res) => {
  res.send('este es tu pefil');
});

app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not found !!!' }));

app.listen(process.env.PORT || 3_000);

module.exports = { app };
