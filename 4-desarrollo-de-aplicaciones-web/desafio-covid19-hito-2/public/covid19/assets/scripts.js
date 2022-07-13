/* 2. Consumir con fetch o jQuery la API local para obtener los datos de todos los países
usando el siguiente endpoint. (2 Puntos) */

const baseURL = 'http://localhost:3000';

const fetchData = async (url) => {
  const response = await fetch(url);
  const { data } = await response.json();

  return data;
}

/* 3. Desplegar la información de la API en un gráfico de barra que debe mostrar sólo los
10 países con más casos activos. (3 Puntos) */
const renderChart = (data) => {
  //Ordenamos la data con sort y cortamos el arreglo a los 10 primeros elementos usando el método slice
  const sliceData = data.slice(0, 10).sort((a, b) => b.confirmed - a.confirmed);

  //Generamos un arreglo de objetos con las propiedades {y, label} formato de canvasJS por cada valor (confirmados, muertos, activos, recuperados)

  let contryLabels = [];
  let confirmedData = [];
  let deathsData = [];
  let recoveredData = [];
  let activeData = [];

  sliceData.forEach(country => {
    confirmedData.push(country.confirmed)
    contryLabels.push(country.location);
    deathsData.push(country.deaths);
    recoveredData.push(country.recovered);
    activeData.push(country.active);
  });

  //Ordenamos la data de mayor a menor con el método sort
  //Copiamos del array los primeros 10 elementos

  const chartData = {
    labels: contryLabels,
    datasets: [{
      axis: 'y',
      label: 'Confirmados',
      data: confirmedData,
      fill: false,
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgb(255, 159, 64)',
      ],
      borderWidth: 1
    },
    {
      axis: 'y',
      label: 'Muertos',
      data: deathsData,
      fill: false,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1
    },
    {
      axis: 'y',
      label: 'Recuperados',
      data: recoveredData,
      fill: false,
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgb(75, 192, 192)',
      ],
      borderWidth: 1
    },
    {
      axis: 'y',
      label: 'Activos',
      data: activeData,
      fill: false,
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgb(153, 102, 255)',
      ],
      borderWidth: 1
    }
    ]
  };

  const config = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  new Chart(document.querySelector("#all-chart"), config);
}


/* 4. Desplegar debajo del gráfico de barras una tabla con la información de todos los
países ordenados alfabéticamente por el nombre del país. (2 Puntos) */
const renderTable = (data) => {
  data.sort((a, b) => a.location.localeCompare(b.location));

  const thead = document.querySelector('thead');
  const tbody = document.querySelector('tbody');

  let templateHeader = `  
    <tr>
      <th scope="col">PAÍS</th>
      <th scope="col">CONFIRMADOS</th>
      <th scope="col">MUERTES</th>
      <th scope="col">RECUPERADOS</th>
      <th scope="col">ACTIVOS</th>
    </tr>   
  `;

  thead.innerHTML = templateHeader;

  let templateBody = data.map(({
    location,
    confirmed,
    deaths,
    recovered,
    active
  }) => `
    <tr>
      <td>${location}</td>
      <td>${confirmed}</td>
      <td>${deaths}</td>
      <td>${recovered}</td>
      <td>${active}</td>
      <td><button type="button" class="btn btn-outline-secondary" onclick="countryModal('${location}')" data-toggle="modal" data-target="#exampleModal">Ver detalles</button></td>
    </tr>
`);

  tbody.innerHTML = templateBody.join('');

}

/* 
5. En cada fila de la tabla se debe incluir un botón “Ver detalles” que abra una ventana
Modal muestre los datos del país en un gráfico circular. (2 Puntos)
*/
window.countryModal = async (location) => {
  let modal = document.querySelector('.modal-body');
  let title = document.querySelector('#exampleModalLabel');

  title.innerHTML = location.toUpperCase();
  //${data[index].location}
  const template = `
  <div bg-light ">
    <section class="w-75 h-75 mx-auto my-5">
      <canvas id="pie-chart" ></canvas>
    </section>
  </div>
  `
  modal.innerHTML = template;

  renderCountry(location);
}

const renderCountry = async (location) => {
  const element = await fetchData(`${baseURL}/api/countries/${location}`);
  
  const data = {
    labels: [
      'Confirmados',
      'Muertos',
      'Recuperados',
      'Activos',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [
        element.confirmed,
        element.deaths,
        element.recovered,
        element.active],
      backgroundColor: [
        'rgb(255, 205, 86)',
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
  };

  const config = {
    type: 'polarArea',
    data: data,
    options: {}
  };

  new Chart(document.querySelector("#pie-chart"), config);
}

(async () => {
  try {
    $('#modal-loader').modal('show');
    let data = await fetchData(`${baseURL}/api/total`);
    /* { y: 212, label: "Italy" }, */
    renderChart(data);
    renderTable(data);
    $('#modal-loader').modal('hide');
  } catch (error) {
    console.log(error);
  }
})()