let radiologia = [
  {
    hora: "11:00",
    especialista: "IGNACIO SCHULZ",
    paciente: "FRANCISCA ROJAS",
    rut: "9878782-1",
    prevision: "FONASA"
  },
  {
    hora: "11:30",
    especialista: "FEDERICO SUBERCASEAUX",
    paciente: "PAMELA ESTRADA",
    rut: "15345241-3",
    prevision: "ISAPRE"
  },
  {
    hora: "15:00",
    especialista: "FERNANDO WURTHZ",
    paciente: "ARMANDO LUNA",
    rut: "16445345-9",
    prevision: "ISAPRE"
  },
  {
    hora: "15:30",
    especialista: "ANA MARIA GODOY",
    paciente: "MANUEL GODOY",
    rut: "17666419-0",
    prevision: "FONASA"
  },
  {
    hora: "16:00",
    especialista: "PATRICIA SUAZO",
    paciente: "RAMON ULLOA",
    rut: "14989389-K",
    prevision: "FONASA"
  },
]

let traumatologia = [
  {
    hora: "8:00",
    especialista: "MARIA PAZ ALTUZARRA",
    paciente: "PAULA SANCHEZ",
    rut: "15554774-5",
    prevision: "FONASA"
  },
  {
    hora: "10:00",
    especialista: "RAUL ARAYA",
    paciente: "ANGÉLICA NAVAS",
    rut: "15444147-9",
    prevision: "ISAPRE"
  },
  {
    hora: "11:00",
    especialista: "ALEJANDRO BADILLA",
    paciente: "FELIPE MARDONES",
    rut: "1547423-6",
    prevision: "ISAPRE"
  },
  {
    hora: "11:30",
    especialista: "CECILIA BUDNIK",
    paciente: "DIEGO MARRE",
    rut: "16554741-K",
    prevision: "FONASA"
  },
  {
    hora: "12:00",
    especialista: "ARTURO CAVAGNARO",
    paciente: "CECILIA MENDEZ",
    rut: "9747535-8",
    prevision: "ISAPRE"
  },
  {
    hora: "12:30",
    especialista: "ANDRES KANACRI",
    paciente: "MARCIAL SUAZO",
    rut: "11254785-5",
    prevision: "ISAPRE"
  }
]


let dental = [
  {
    hora: "8:30",
    especialista: "ANDREA ZUÑIGA",
    paciente: "MARCELA RETAMAL",
    rut: "11123425-6",
    prevision: "ISAPRE"
  },
  {
    hora: "11:00",
    especialista: "MARIA PIA ZAÑARTU",
    paciente: "ANGEL MUÑOZ",
    rut: "9878789-2",
    prevision: "ISAPRE"
  },
  {
    hora: "11:30",
    especialista: "SCARLETT WITTING",
    paciente: "MARIO KAST",
    rut: "7998789-5",
    prevision: "FONASA"
  },
  {
    hora: "13:00",
    especialista: "FRANCISCO VON TEUBER",
    paciente: "KARIN FERNANDEZ",
    rut: "18887662-K",
    prevision: "FONASA"
  },
  {
    hora: "13:30",
    especialista: "EDUARDO VIÑUELA",
    paciente: "HUGO SANCHEZ",
    rut: "17665461-4",
    prevision: "FONASA"
  },
  {
    hora: "14:00",
    especialista: "RAQUEL VILLASECA",
    paciente: "ANA SEPULVEDA",
    rut: "14441281-0",
    prevision: "ISAPRE"
  }
]

/* Desafío */

/* Función que tranforma a texto capitalizado el argumento recibido*/
function capitalize(valor){
  let result = valor.toLowerCase();
  return result.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}

/* Imprimimos la información en el html */
document.write(`

<div class="container mt-5">
  <h1>Radiología</h1>

  <table class="table table-dark">
    <thead>
      <tr id="encabezado-tabla-radiologia">

      </tr>
    </thead>
    <tbody id="cuerpo-tabla-radiologia">

    </tbody>
  </table>

  <p>Primera atención: ${capitalize(radiologia[0].paciente)} - ${capitalize(radiologia[0].prevision)} | 
    Última atención: ${capitalize(radiologia[radiologia.length -1].paciente)} - ${capitalize(radiologia[radiologia.length -1].prevision)}.</p>

  <h1>Traumatologia</h1> 

  <table class="table table-dark">
    <thead>
      <tr id="encabezado-tabla-traumatologia">

      </tr>
    </thead>
    <tbody id="cuerpo-tabla-traumatologia">

    </tbody>
  </table>

  <p>Primera atención: ${capitalize(traumatologia[0].paciente)} - ${capitalize(traumatologia[0].prevision)} | 
    Última atención: ${capitalize(traumatologia[traumatologia.length -1].paciente)} - ${capitalize(traumatologia[traumatologia.length -1].prevision)}.</p>

  <h1>Dental</h1> 

  <table class="table table-dark">
    <thead>
      <tr id="encabezado-tabla-dental">

      </tr>
    </thead>
    <tbody id="cuerpo-tabla-dental">
  
    </tbody>
  </table>

  <p>Primera atención: ${capitalize(dental[0].paciente)} - ${capitalize(dental[0].prevision)} | 
    Última atención: ${capitalize(dental[dental.length -1].paciente)} - ${capitalize(dental[dental.length -1].prevision)}.</p>

</div>
`);


/* Insertamos las filas con la información*/
let filasRadiologia = "";
let filasTraumatologia = "";
let filasDental = ""

for(let valor of radiologia){
  
  filasRadiologia += `
  <tr>
    <td>${valor.hora}</td>
    <td>${valor.especialista}</td>
    <td>${valor.paciente}</td>
    <td>${valor.rut}</td>
    <td>${valor.prevision}</td>
  </tr>
  `;
}

for(let valor of traumatologia){
  
  filasTraumatologia += `
  <tr>
    <td>${valor.hora}</td>
    <td>${valor.especialista}</td>
    <td>${valor.paciente}</td>
    <td>${valor.rut}</td>
    <td>${valor.prevision}</td>
  </tr>
  `;
}

for(let valor of dental){
  
  filasDental += `
  <tr>
    <td>${valor.hora}</td>
    <td>${valor.especialista}</td>
    <td>${valor.paciente}</td>
    <td>${valor.rut}</td>
    <td>${valor.prevision}</td>
  </tr>
  `;
}

/* Insertamos los encabezados de las colimnas */
let columnas = "";
let encabezados = Object.keys(dental[0]);

for(let valor of encabezados){
  columnas += `
    <th scope="col">${valor.toUpperCase()}</th>
  `;
}


// Insertamos en la tabla la información creada de filas y columnas
document.getElementById("cuerpo-tabla-radiologia").innerHTML = filasRadiologia;
document.getElementById("encabezado-tabla-radiologia").innerHTML = columnas;

document.getElementById("cuerpo-tabla-traumatologia").innerHTML = filasTraumatologia;
document.getElementById("encabezado-tabla-traumatologia").innerHTML = columnas;

document.getElementById("cuerpo-tabla-dental").innerHTML = filasDental;
document.getElementById("encabezado-tabla-dental").innerHTML = columnas;

