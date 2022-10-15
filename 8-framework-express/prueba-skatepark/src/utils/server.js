const express = require('express');
const exphbs = require('express-handlebars');
const { getHashedPassword } = require('./crypto');
const fileUpload = require('express-fileupload');
const { sign, verify, refresh } = require('./jwt');

const {
  createUser,
  getUsers,
  updateUser,
  destroyUser,
  findOneUser,
  setUserState
} = require('./pg');
// 1. Crear una API REST con el Framework Express (3 Puntos)
const app = express();

// 2. Servir contenido dinámico con express-handlebars (3 Puntos)
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  layoutsDir: './src/views/layouts',
  partialsDir: './src/views/partials'
}));

app.use(fileUpload({
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  abortOnLimit: true,
  responseOnLimit: 'El peso del file excede los 5MB permitidos'
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

//Static files
app.use('/assets', express.static('./public/assets', { root: process.cwd() }));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist', { root: process.cwd() }));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const requireAuth = (req, res, next) => {
  const decoded = req.query.token
    ? verify(req.query.token)
    : verify(req.headers.authorization);

  if (decoded?.code) return res.status(401).json({ ...decoded });

  req.user = decoded;
  next();
}

//Routes
app.get('/', async (req, res) => {
  const users = await getUsers();
  res.render('home', { users })
});
app.get('/signin', (req, res) => res.render('registro'));
app.get('/login', (req, res) => res.render('login'));
app.get('/profile', requireAuth, async (req, res) => {
  const { foundUser } = req.user

  const [{ password, is_admin }] = await findOneUser([foundUser.id]);

  //Si el usuario es administrador, redireccioamos al perfil de administrador
  if (is_admin === true) return res.redirect(`/admin?token=${req.query.token}`);

  res.render('profile', { user: { ...foundUser, password } });
});

app.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  const users = await getUsers();
  const foundUser = users.find((u) => u.email === email && u.password === hashedPassword);

  if (!foundUser) return res.status(401).json({ code: 401, message: 'Credenciales incorrectas' });
  delete foundUser.password;
  const token = sign({ foundUser });
  res.status(200).json({ jwt: token });
});

app.post('/users', async (req, res) => {
  const { email, nombre, password, anos_experiencia, especialidad, foto } = req.body;

  const hashedPassword = getHashedPassword(password);
  const result = await createUser([...Object.values({ email, nombre, hashedPassword, anos_experiencia, especialidad, foto }), false]);

  res.status(result?.code ? 500 : 200).json(result);
});

app.patch('/users', requireAuth, async (req, res) => {
  const { nombre, password, anos_experiencia, especialidad } = req.body;
  let hashedPassword = password;
  const [currentUser] = await findOneUser([req.user.foundUser.id]);

  if (currentUser.password !== password)
    hashedPassword = getHashedPassword(password);

  const result = await updateUser([
    req.user.foundUser.id,
    nombre,
    hashedPassword,
    anos_experiencia,
    especialidad
  ]);

  if (!result) res.status(result?.code ? 500 : 200).json(result);
  delete result[0].password;

  //Se actualiza token con la nueva data
  const token = refresh(req.headers.authorization, { foundUser: result[0] });
  res.status(200).json({ jwt: token });
});

app.delete('/users', requireAuth, async (req, res) => {
  const result = await destroyUser([req.user.foundUser.id]);
  res.status(result?.code ? 500 : 200).json(result);
});

app.post('/upload', (req, res) => {
  const { image } = req.files;

  image.mv(`${process.cwd()}/public/assets/img/${image.name}`, (err) => {
    if (err) return res.status(500).json({ code: 500, message: 'Page not found' });
    res.status(200).json({ success: true });
  });
});

app.get('/admin', requireAuth, async (req, res) => {
  const users = await getUsers();
  res.render('admin', { users })
})

app.patch('/users/state', async (req, res) => {
  const { userId, state } = req.body;

  const result = await setUserState([userId, state]);
})

app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not found' }));

app.listen(process.env.PORT || 3_000);

module.exports = { app };

