const express = require('express');

const app = express();

const canales = [{ nombre: 'TVN' }, { nombre: 'MEGA' }];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/canales', (req, res) => res.status(200).json({ canales }));

app.post('/canal', (req, res) => {
  const { nombre } = req.body;
  canales.push({ nombre });
  res.status(201).json({ canales });
});

app.put('/canal/:canal', (req, res) => {
  const { canal } = req.params;
  const { nombre } = req.body;
  canales.find((item) => item.nombre === canal ? (item.nombre = nombre) : null);
  res.status(202).json({ canales });
});

app.delete('/canal/:canal', (req, res) => {
  const { canal } = req.params;
  canales.splice(canales.map(({ nombre }) => nombre).indexOf(canal), 1);
  res.status(200).json({ canales });
});

app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not found!' }));

app.listen(process.env.PORT || 3_000);

module.exports = { app };
