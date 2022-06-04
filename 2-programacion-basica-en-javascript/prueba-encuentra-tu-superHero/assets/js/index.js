$(document).ready(function () {
  $('form').submit(function (event) {
    //desactivamos el comportamiento pot defecto del formulario
    event.preventDefault();

    let search = $('input').val();

    //Si lo ingresado fue un número limpiamos el mensaje de alerta
    $('#input-help').html('');

    //Validamos que el valor ingresado sea un número
    if (isNaN(search)) {
      return $('#input-help').html("No ingresate un número");
    }

    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/345704984359603/${search}`,
      dataType: "json",
      success: function (datosApi) {
        //console.log(datosApi)

        //Validamos que el id exista
        if (datosApi.response === "error") return alert(datosApi.error);
        //console.log(search);

        //Limpiamos el contenido del div que trae el resultado
        $('#hero-info').html('');

        //Insertamos la card en el div con la información traida de la api
        $('#hero-info')
          .html(`
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src="${datosApi.image.url}" class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${datosApi.name}</h5>
                    <p class="card-text">
                    Conexiones: ${datosApi.connections[`group-affiliation`]}
                    </p>
                    <p class="card-text">
                      <small class="text-muted">publicado por:${datosApi.biography.publisher}</small>
                    </p>
                    <p class="card-text">
                      Ocupación: ${datosApi.work.occupation}
                    </p>
                    <p class="card-text">
                      Altura: ${datosApi.appearance.height[1]}
                    </p>
                    <p class="card-text">
                      Peso: ${datosApi.appearance.weight[1]}
                    </p>
                    <p class="card-text">
                      Alianzas: ${datosApi.biography.aliases}
                    </p>
                  </div>
                </div>
              </div>
            </div>
        `);

        //Desconstruimos llaves y valores en arreglos separados
/*         let stats = Object.keys(datosApi.powerstats);
        let value = Object.values(datosApi.powerstats); */

        //Creamos un nuevo array con el formato de canvasJS con el método map
        //let estadistica = value.map((el, index) => { return { y: el, label: stats[index] } });

        //Se refactoriza el método para obtener el arreglo en formato de la libreria canvasJS
        let estadistica = Object.entries(datosApi.powerstats).map(element => ({y: element[1], label: element[0]}))

        /*         
          Formato de canvas JS, codigo refactorizado en línea 58
          let estadistica = [
            {y: value[0], label: stats[0] },
            {y: value[1], label: stats[1] },
            {y: value[2], label: stats[2] },
            {y: value[3], label: stats[3] },
            {y: value[4], label: stats[4] },
          ] 
        */
        let config = {
          animationEnabled: true,
          title: {
            text: "Estadisticas"
          },
          axisY: {
            title: "valor"
          },
          axisX: {
            title: "power stats"
          },
          data: [
            {
              indexLabel: "{label} ({y})",
              type: "pie",
              dataPoints: estadistica
            }
          ]
        }

        let chart = new CanvasJS.Chart("hero-stats", config);

        chart.render();
        //estadistica.push({label})
        //console.log(estadistica);
      },
      error: function (error) {
        alert(error);
      },
    });
  });
});