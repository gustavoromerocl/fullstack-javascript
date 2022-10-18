const express = require('express')
const guitarras = require('./data/guitarras.js')
const app = express()
app.listen(3000, () => console.log("Servidor encendido!"))

app.use(express.static('public'))

/* app.get('/', async (req, res) => {
  console.log(guitarras)
  res.send(guitarras)
}) */

app.get('/api/v1/guitarras', (req, res) => {
  const guitarras = HATEOASV1();
  res.send({ contidad: guitarras.length, guitarras });
});

app.get('/api/v2/guitarras', (req, res) => {
  const { values: order, page, limits = 2 } = req.query;

  if (page) {
    const guitarras = HATEOASV2().slice(page * limits - limits, page * limits);
    return res.send({
      count: guitarras.length,
      page,
      limits,
      next: guitarras.length < limits ? false : `/api/v2/guitarras?page=${+page + +1}&limits=3`,
      previous: page <= 1 ? false : `/api/v2/guitarras?page=${page - 1}&limits=3`,
      results: guitarras
    });
  }

  if (order) {
    const guitarrasOrdenadas = orderValues(order);
    if (guitarrasOrdenadas) return res.send(guitarrasOrdenadas);
  }

  const guitarras = HATEOASV2();
  res.send({ contidad: guitarras.length, guitarras });
});

app.get('/guitarra/:id', (req, res) => {
  const { id } = req.params;
  res.send(guitarra(id));
});

app.get('/api/v2/guitarra/:id', (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;

  const g = guitarra(id);

  if (!g) {
    return res.status(404).json({
      code: 404,
      message: 'La guitarra no fue encontrada...'
    });
  }

  if (!fields) {
    return res.send(g);
  }

  const newGuitarra = fieldsSelect({ ...g }, fields);
  res.status(newGuitarra?.code ? 400 : 200).json(newGuitarra);
});

app.get('/api/v2/body/:cuerpo', (req, res) => {
  const { cuerpo } = req.params;
  const guitarras = filtroByBody(cuerpo);
  res.send({ cantidad: guitarras.length, guitarras });
});

app.get('/api/v2/color/:color', (req, res) => {
  const { color } = req.params;
  const guitarras = filtroByColor(color);
  res.send({
    cantidad: guitarras.length,
    guitarras
  });
});

const HATEOASV1 = () => {
  return guitarras.map(({ id, name }) => {
    return {
      name,
      href: `http://localhost:3000/guitarra/${id}`
    };
  });
};

const HATEOASV2 = () => {
  return guitarras.map(({ id, name }) => {
    return {
      guitar: name,
      src: `http://localhost:3000/api/v2/guitarra/${id}`
    };
  });
};

const guitarra = (id) => guitarras.find((g) => g.id == id);

const filtroByBody = (body) => guitarras.filter((g) => g.body === body);

const filtroByColor = (color) => guitarras.filter((g) => g.color === color);

const orderValues = (order) => {

  if (order === 'asc') {
    return guitarras.sort((a, b) => a.value - b.value);
  }

  if (order === 'desc') {
    return guitarras.sort((a, b) => (b.value - a.value));
  }

  return false;

};

const fieldsSelect = (guitarra, fields) => {
  let aux = false;
  const properties = Object.keys(guitarra);
  fields.split(',').forEach(field => {
    if (!properties.includes(field)) {
      aux = true;
    }
  });

  if (aux) {
    return {
      code: 400,
      message: 'Una o mas propiedades tienen problemas...'
    };
  }

  for (propiedad in guitarra) {
    if (!fields.includes(propiedad)) {
      delete guitarra[propiedad];
    }
  }
  return guitarra;
};

/* fieldsSelect({ ...guitarras[0] }, 'id,name,brand,color'); */

