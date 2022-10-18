const express = require('express');
const { createCanal, readCanal, updateCanal, deleteCanal } = require('./pg');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/canales', async (req, res) => {
  const result = await readCanal();
  res.status(result?.code ? 500 : 200).json({ result });
});

app.post('/canal', async (req, res) => {
  const { nombre } = req.body;
  const result = await createCanal([nombre]);
  res.status(result?.code ? 500 : 201).json({ result });
});

app.put('/canal/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const result = await updateCanal([id, nombre]);
  res.status(result?.code ? 500 : 202).json({ result });
});

app.delete('/canal/:id', async (req, res) => {
  const { id } = req.params;
  const result = await deleteCanal([id]);
  res.status(result?.code ? 500 : 200).json({ result });
});

app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not found!' }));

app.listen(process.env.PORT || 3_000);

module.exports = { app };
