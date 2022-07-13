/* 2. Enviar los datos del usuario al servidor para obtener un token JWT. (2 Puntos) */

const baseUrl = 'http://localhost:3000';

//Captura del formulario en el html
const form = document.querySelector('form');
const chart = document.querySelector('#usa-chart');
const logout = document.querySelector('#logout');

//Agregamos listener a la etiqueta form
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  //Capturamos los valores ingresados por el usuario en los input
  const [{ value: email }, { value: password }] = event.target;

  try {
    $('#modal-loader').modal('show');
    //getToken obtiene el token si las credenciales (usuario, contraseña) son válidas
    const token = await getToken({ email, password });

    //Obtenemos la data con el token obtenido
    const [confirmed, deaths, recovered] = await Promise.all([
      getData(token, '/api/confirmed'),
      getData(token, '/api/deaths'),
      getData(token, '/api/recovered')
    ]);

    renderChart(confirmed, deaths, recovered);
    $('#modal-loader').modal('hide');
  } catch (error) {
    console.log(error);
  }
});

const getToken = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      body: JSON.stringify(user)
    });

    const { token } = await response.json();

    localStorage.setItem('jwt', token);
    logout.classList.toggle('d-none');

    if (token) {
      form.classList.toggle('d-none');
    }

    return token;
  } catch (error) {
    console.log(error);
  }
}

/* 3. Usar el token obtenido para hacer otra consulta al servidor y obtener el historial de
datos de Estados Unidos (3 Puntos) */

const getData = async (token, uri) => {
  const response = await fetch(`${baseUrl}${uri}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  });

  const { data } = await response.json();

  return data;
}

/* 4. Renderizar una gráfica de líneas con los datos del historial usando una librería de
gráficas cómo Chart Js o Canvas Js. */

const renderChart = (confirmed, deaths, recovered) => {
  let labels = [];
  let confirmedValues = [];
  let deathsValues = [];
  let recoveredValues = [];


  confirmed.forEach(data => {
    const { date, total } = data;

    labels.push(date);
    confirmedValues.push(total);
  });

  deaths.forEach(data => {
    const { total } = data;

    deathsValues.push(total);
  });

  recovered.forEach(data => {
    const { total } = data;

    recoveredValues.push(total);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Confirmados',
        data: confirmedValues,
        fill: false,
        borderColor: 'rgb(255, 255, 0)',
        tension: 0.1
      },
      {
        label: 'Muertes',
        data: deathsValues,
        fill: false,
        borderColor: 'rgb(255, 0, 0)',
        tension: 0.1
      },
      {
        label: 'Recuperados',
        data: recoveredValues,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
    ]
  };

  const config = {
    type: 'line',
    data: data,
  };

  new Chart(document.querySelector("#usa-chart"), config);
}

/* 5. Persistir el JWT en LocalStorage y utilizarlo al recargar la página para obtener el
historial y renderizar la gráfica (Opcional) */

(async () => {
  const token = localStorage.getItem('jwt');

  if (token) {
    try {
      $('#modal-loader').modal('show');

      form.classList.toggle('d-none');
      logout.classList.toggle('d-none');

      const [confirmed, deaths, recovered] = await Promise.all([
        getData(token, '/api/confirmed'),
        getData(token, '/api/deaths'),
        getData(token, '/api/recovered')
      ]);

      renderChart(confirmed, deaths, recovered);

      $('#modal-loader').modal('hide');
    } catch (error) {
      console.log(error);
    }

  }
})();

/* 
6. Agregar un botón “Cerrar sesión” en el Menú de navegación al realizar el login
exitosamente. Al presionar este botón se deberá eliminar el JWT de LocalStorage y
recargar la página (Opcional)
*/

logout.addEventListener('click', () => removeToken());

const removeToken = () => {
  localStorage.removeItem('jwt');
  window.location.reload();
}


