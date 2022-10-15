const express = require('express');
const { insert, findAll, update, destroy} = require('./pg');

const app = express();

app.use(express.static('./public', { root: process.cwd() }));
app.use(express.json());
app.get('/', (req, res) => res.sendFile('./public/index.html', { root: process.cwd() }));

app.post('/curso', async (req, res) => {
  const result = await insert(Object.values(req.body));
  console.log(result);
  res.status(result?.code ? 500 : 200).json(result);
})

app.get('/cursos', async (req, res) => {
  const result = await findAll();
  res.status(result?.code ? 500 : 200).json(result);
});

app.put('/curso', async (req, res) => {
  console.log("PUT",req.body);
  const result = await update(Object.values(req.body));
  res.status(result?.code ? 500 : 200).json(result);
});

app.delete('/curso/:id', async (req, res) => {
  console.log(req.params.id);
  const result = destroy([req.params.id]);
  res.status(result?.code ? 500 : 200).json(result);
})

app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not found' }));

app.listen(process.env.PORT || 3000);

module.exports = { app };