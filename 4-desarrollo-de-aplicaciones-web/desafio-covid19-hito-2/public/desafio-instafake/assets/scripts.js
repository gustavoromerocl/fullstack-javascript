/* 1. Obtener el JWT a través del formulario de login entregado. */

const baseURL = 'http://localhost:3000/api/photos';

//Capturamos el formulario desde el html
const form = document.querySelector('form');
const next = document.querySelector('#next-page');
const logout = document.querySelector('#logout-btn');

let page = localStorage.getItem('page') || 1;

//Agregamos el listener al forumlario del evento submit
form.addEventListener('submit', async(ev) => {
  ev.preventDefault();

  const [{ value: email }, { value: password }] = ev.target;

  const token = await getToken({email, password});
  const data = await getData(token);

  renderPhotos(data);
})

const getToken = async (user) => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    body: JSON.stringify(user)
  })

  const { token } = await response.json();

  localStorage.setItem('token', token);
  localStorage.setItem('page', 1);

  return token;
}



/* 3. Al momento de recibir el JWT ocultar el formulario y mostrar el feed principal con las
fotos. */
const getData = async (token, page = 1) => {
  const response = await fetch(`${baseURL}?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })

  const { data } = await response.json();

  if (data) renderPhotos(data);

  return data;
}

/* 4. Con el JWT consumir la API http://localhost:3000/api/photos. */
const renderPhotos = (data) => {
  data = data.slice(1,11);
  let template = data.map((photo) => {  
    return `
    <div class="card mb-4">
      <img src="${photo.download_url}" class="card-img-top"/>
      <div class="card-body">
       <p>Autor: ${photo.author}</p>
      </div>
    </div>

  `});

  const [form, main, contain] = document.querySelectorAll('#main-container, #session-form, #contain');
  //console.log(form, main, contain);
  contain.innerHTML = template.join('');

  if(form.classList.contains('d-none')) return;
  main.classList.toggle('d-none');
  form.classList.toggle('d-none');  
}

/* 2. Persistir el token utilizando localStorage. */
(async () => {
  const token = localStorage.getItem('token');

  /* 6. Cargar el feed de fotos cuando exista el JWT */
  if (token) {
    console.log(page);
    await getData(token, page);
  } 
})()

/* 7. En la parte inferior de la página, crear un botón que al presionarlo traiga más fotos
(http://localhost:3000/api/photos?page=x), que deben ser añadidas al listado
existente. */
next.addEventListener('click', async (ev) => {
  ev.preventDefault();
  
  const token = localStorage.getItem('token');
  localStorage.setItem('page', Number(page) + 1);
  
  page = localStorage.getItem('page');

  if (token) {    
    await getData(token,page);
  } 
})

/* 8. Crear botón de logout que elimine el JWT almacenado y vuelva la aplicación a su
estado inicial. */

logout.addEventListener('click', () => {
  //Elimina los items guardados en el local storage
  localStorage.removeItem('token');
  localStorage.removeItem('page');

  //Recarga la página
  window.location.reload();
})