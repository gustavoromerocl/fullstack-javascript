/* Captura del formulario */
const form = document.querySelector('form');

/* Listener del formulario */
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  
  /* Captura de los inputs */
  const [
    { value: email },
    { value: password }
  ] = ev.target;

  //Obtener token y realizar petición a la api
  const token = await getToken({ email, password });
  const data = await getPost(token);

  //render de el html con los datos
  fillData(data);
});

const getToken = async (user) => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    body: JSON.stringify(user)
  });
  const { token } = await response.json();

  localStorage.setItem('token', token);

  return token;
}

const getPost = async (token) => {
  const response = await fetch('http://localhost:3000/api/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });

  const { data } = await response.json();

  return data;
}


const fillData = (data) => {

  const template = data.map(({ id, title, body }) =>
    `
    <tr>
      <td scope="col">${id}</td>
      <td scope="col">${title}</td>
      <td scope="col">${body}</td>
    </tr>
    `);

  document.querySelector('tbody').innerHTML = template.join('');

  const [login, table] = document.querySelectorAll('#wrapper-form, #wrapper-table');

  login.classList.toggle('d-none');
  table.classList.toggle('d-none');
}

//iife para validar que ya exista un token en local storage y saltarse el login
(async () => {
  const token = localStorage.getItem('token');
  if(token){
    const data = await getPost(token);
    fillData(data);
  }
})()