/* 
1. Crear tres funciones, una request, otra getUser y por último una función getRepo,
todas deben implementar async..await. La función request hará las peticiones a la
API y retorna el resultado, mientras que las funciones getUser y getRepo enviarán
los datos a la función request para obtener la información del usuario y los
repositorios a mostrar. Utiliza una URL base con el valor:
https://api.github.com/users.
*/

const baseURL = 'https://api.github.com/users'

const request = async (url) => {
  const response = await fetch(url);
  return await response.json();
}

const getUser = async (user) => {
  const userData = await request(`${baseURL}/${user}`);
  return userData;
}

const getRepo = async (user, pagina, cantidad_repos) => {
  const repoData = await request(`${baseURL}/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`);
  return repoData;
}

/* 
2. Agregar una escucha (addEventListener) al formulario, que permita activar una
función en donde se capturen los datos ingresados por el usuario de la página
(nombre de usuario, número de página, repositorio por páginas).
*/

const form = document.querySelector('form');
const inputUsuario = form.querySelector('#nombre');
const inputPagina = form.querySelector('#pagina');
const inputNroRepos = form.querySelector('#repoPagina');
const resultado = document.querySelector('#resultados');

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();

  //Asignamos a las variables de tipo const las etiquetas con los ids pasados en la función queryselector

  /* 
  3. Mediante la implementación de una Promesa, realizar el llamado a las dos funciones
  al mismo tiempo que permiten conectarse con la API y traer la información en el
  caso de existir “getUser” y “getRepo”. Pasando como parámetros los valores
  necesarios para cada llamado de la API según la URL.
  */

  //.log(await getRepo(inputUsuario, inputPagina, inputNroRepos));

  try {
    const [usuario, repos] = await Promise.all([
      getUser(inputUsuario.value),
      getRepo(inputUsuario.value, inputPagina.value, inputNroRepos.value)
    ]);

    if (usuario.message || repos.message) throw { usuario, repos };
    /* 
    4. Mostrar los resultados obtenidos de la API en el documento HTML en la sección de
    “Resultados”, como se muestra en la figura número dos.
    */
    pintarResultados(usuario, repos);

  }catch (e) {
    /* 
    5. En el caso que el mensaje retornado por la API sea “Not Found”, indicar mediante
    una ventana emergente que el usuario no existe y no mostrar ningún tipo de
    información en la sección de resultado en el documento HTML.
    */
    console.log(e);
    alert("El usuario ingresado no existe");
    resultado.innerHTML = '';
  }
});


const pintarResultados = (usuario, repos) => {
  


  resultado.innerHTML = `
  <div class="col-6 border">
    <h2>Datos de usuario: </h2>
    <img src="${usuario.avatar_url}" alt="avatar">
    <ul>
        <li>Nombre de usuario: ${usuario.name}</li>
        <li>Nombre de login: ${usuario.login}</li>
        <li>Cantidad de repositorios: ${usuario.public_repos}</li>
        <li>Localidad: ${usuario.location}</li>
        <li>Tipo de usuario: ${usuario.type}</li>
    </ul>
  </div>
  <div class="col-6 border">

  <h2>Nombre de repositorios: </h2>
    <ul>
    ${repos.map((repo) => `

      <li>${repo.name}</li>
      
    `)}
    </ul>
  </div>
  `;
}


/* return new Promise( async (resolve, reject) => {
  const promesas = await Promise.all([
    getUser(inputUsuario),
    getRepo(inputUsuario, inputPagina, inputNroRepos)
  ])
  console.log(promesas)
  resolve(promesas)
})  */


  //console.log(await getUser('gustavoromerocl'));

