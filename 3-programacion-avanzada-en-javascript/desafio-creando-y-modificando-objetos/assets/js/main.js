/* 
Requerimientos
 
1. Crear todo el código usando ES5.
*/

/* 
2. Crear una función constructora para cada objeto.
*/
//Función constructora del objeto Paciente
function Consultorio(nombre, pacientes) {
  //recibimos los parametro en variables
  this.nombre = nombre;
  this.pacientes = pacientes || [];

}

//Función constructora del objeto Paciente
function Paciente(nombre, edad, rut, diagnostico) {
  let _nombre = nombre;
  let _edad = edad;
  let _rut = rut;
  let _diagnostico = diagnostico;

  //Definiendo getters
  Object.defineProperty(this, "_getNombre", {
    get: function () {
      return _nombre
    }
  });

  Object.defineProperty(this, "_getEdad", {
    get: function () {
      return _edad
    }
  });

  Object.defineProperty(this, "_getRut", {
    get: function () {
      return _rut
    }
  });

  Object.defineProperty(this, "_getDiagnostico", {
    get: function () {
      return _diagnostico
    }
  });

  //Definiendo setters
  Object.defineProperty(this, "_setNombre", {
    set: function (nombre) {
      return _nombre = nombre;
    }
  });

  Object.defineProperty(this, "_setEdad", {
    set: function (edad) {
      return _edad = edad;
    }
  });

  Object.defineProperty(this, "_setRut", {
    set: function (rut) {
      return _rut = rut;
    }
  });

  Object.defineProperty(this, "_setDiagnostico", {
    set: function (diagnostico) {
      return _diagnostico = diagnostico;
    }
  });
}

/* 
3. Implementar métodos getters y setters para poder acceder y modificar los datos de
los pacientes.
*/

//Getters
Paciente.prototype.getNombre = function () {
  return this._getNombre;
}

Paciente.prototype.getEdad = function () {
  return this._getEdad;
}

Paciente.prototype.getRut = function () {
  return this._getRut;
}

Paciente.prototype.getDiagnostico = function () {
  return this._getDiagnostico;
}

//Setters

Paciente.prototype.setNombre = function (nombre) {
  return this._setNombre = nombre;
}

Paciente.prototype.setEdad = function (edad) {
  return this._setEdad = edad;
}

Paciente.prototype.setRut = function (rut) {
  return this._setRut = rut;
}

Paciente.prototype.setDiagnostico = function (rut) {
  return this._setDiagnostico = rut;
}

/* 
4. Crear un método mediante la propiedad prototype que permita buscar los datos de
los usuarios por nombre y otro método que permita mostrar todos los datos de los
usuarios registrados.
*/

//Método que agrega un nuevo paciente
Consultorio.prototype.agregarPaciente = function (paciente) {
  this.pacientes.push(paciente);
}

//método que busca los datos de los usuarios por nombre
Consultorio.prototype.buscarPaciente = function (nombre) {
  let paciente = this.pacientes.find(paciente => paciente.getNombre() === nombre);
  if (paciente) return ({
    nombre: paciente.getNombre(),
    edad: paciente.getEdad(),
    rut: paciente.getRut(),
    diagnostico: paciente.getDiagnostico()
  });

  return -1;
}

Consultorio.prototype.mostrarPacientes = function () {
  let pacientes = this.pacientes.map(element => ({
    nombre: element.getNombre(),
    edad: element.getEdad(),
    rut: element.getRut(),
    diagnostico: element.getDiagnostico()
  }));

  return pacientes;
}

/* 
5. Instanciar cada objeto utilizando la instrucción new.
*/

let p1 = new Paciente("FRANCISCA ROJAS", "31", "9878782-1", "positivo");
let p2 = new Paciente("PAMELA ESTRADA", "45", "15345241-3", "negativo");
let p3 = new Paciente("ARMANDO LUNA", "27", "16445345-9", "negativo");
let p4 = new Paciente("MANUEL GODOY", "56", "17666419-0", "negativo");
let p5 = new Paciente("RAMON ULLOA", "73", "14989389-K", "negativo");

let consultorio = new Consultorio("soa Bachelé", [p1, p2, p3, p4, p5]);


//Accediendo a los valores con getters
console.log(p1.getNombre());
console.log(p1.getEdad());
console.log(p1.getRut());
console.log(p1.getDiagnostico());

//Actualizando los valores con getter
p1.setNombre("GUSTAVO ROMERO");
p1.setEdad("25");
p1.setRut("1111111-1");
p1.setDiagnostico("negativo")

//Obteniendo pacientes por nombre con la función buscarPaciente
console.log(consultorio.buscarPaciente("FRANCISCA ROJAS"));
console.log(consultorio.buscarPaciente("MANUEL GODOY"));
console.log(consultorio.buscarPaciente("Obi-Wan Kenobi"));
console.log(consultorio.mostrarPacientes());

/* Poblando el HTML */

function crearTabla(contenedor, selector, tabla, data) {
  document.querySelector(contenedor).innerHTML = "";
  document.querySelector(contenedor).innerHTML = tabla;
  document.querySelector(selector).innerHTML = data.join("");  
}

let encabezadosArray = Object.keys(...consultorio.mostrarPacientes());

let cuerpoArreglo = consultorio.mostrarPacientes().map(function (elemento) {
  return `
  <tr class="odd:bg-gray-100">
    <td>${elemento.nombre}</td>
    <td>${elemento.edad}</td>
    <td>${elemento.rut}</td>
    <td>${elemento.diagnostico}</td>
  </tr>
  `
});

let tabla = `
  <section>
    <!-- tabla de pacientes -->
    <table class=" table-auto mx-auto w-full">
      <thead>
        <tr class="bg-stone-600 text-white">
          <th class="text-left pr-3 rounded-tl-md">${encabezadosArray[0]}</th>
          <th class="text-left pr-3">${encabezadosArray[1]}</th>
          <th class="text-left pr-3">${encabezadosArray[2]}</th>
          <th class="text-left rounded-tr-md">${encabezadosArray[3]}</th>
        </tr>
      </thead>
      <tbody id="cuerpo">
      
      </tbody>
    </table>
  </section>
`; 


let formularioBusqueda = `
  <form id="formulario-busqueda" class="flex flex-col mx-auto mb-9 w-96 py-12 rounded border-2 border-gray-500">
    <div class="w-64 mx-auto">
      <label for="paciente" >Nombre paciente:</label>
      <input type="text" id="paciente" placeholder="Ej: Gustavo Romero" class="w-64 rounded-md py-2  mb-3  border-2 border-gray-300">
      <p class="text-red-400"></p>
    </div>
    <button class="w-32 py-2 px-4 bg-black text-white mx-auto rounded-md">Buscar</button>
  </form>
  <div id="resultado-busqueda"></div>

`;

let formularioPaciente = `
  <form id="formulario-paciente" class="mx-auto flex w-96 flex-col rounded border-2 border-gray-500 py-12">
    <div class="mx-auto w-64">
      <label for="paciente">Nombre:</label>
      <input type="text" id="nombre" placeholder="Ej: Gustavo Romero" class="mb-3 w-64 rounded-md border-2 border-gray-300 py-2" />
      <label for="paciente">Edad:</label>
      <input type="text" id="edad" placeholder="Ej: 30" class="mb-3 w-64 rounded-md border-2 border-gray-300 py-2" />
      <label for="paciente">Rut:</label>
      <input type="text" id="rut" placeholder="Ej: 17690xxx-x" class="mb-3 w-64 rounded-md border-2 border-gray-300 py-2" />
      <label for="paciente">Diagnóstico:</label>
      <input type="text" id="diagnostico" placeholder="Ej: Covid positivo" class="mb-3 w-64 rounded-md border-2 border-gray-300 py-2" />
    </div>
    <button class="mx-auto w-32 rounded-md bg-black py-2 px-4 text-white">Agregar</button>
  </form>
`;

document.addEventListener("DOMContentLoaded", function () {
  //console.log("documento listo");
  crearTabla("#main", "#cuerpo", tabla, cuerpoArreglo);
})


document.querySelector('#inicio').addEventListener("click", function (ev) {
  ev.preventDefault();
  crearTabla("#main", "#cuerpo", tabla, cuerpoArreglo);

});

//Buscar un paciente
document.querySelector('#buscar').addEventListener("click", function (ev) {
  ev.preventDefault();
  //Renderizamos el formulario de busqueda
  document.querySelector('#main').innerHTML = formularioBusqueda;
  
  //Agregamos listener al envío del formulario
  document.querySelector("#formulario-busqueda").addEventListener("submit", function(ev){
    ev.preventDefault();
    //guardamos la busqueda recibida en el input en una variable
    let busqueda = ev.target.querySelector("input").value;
    //Vaciamos el error
    ev.target.querySelector("p").innerHTML = "";

    //Guardamos el resultado del método buscarPaciente
    let paciente = consultorio.buscarPaciente(busqueda);

    //Validamos que el venga un resultado válido
    if(paciente === -1) return ev.target.querySelector("p").innerHTML = "El nombre ingresado no existe";

    //renderizamos la tabla con el resultado
    document.querySelector("#resultado-busqueda").innerHTML = tabla;
    document.querySelector("#cuerpo").innerHTML = `
    <tr class="odd:bg-gray-100">
      <td>${paciente.nombre}</td>
      <td>${paciente.edad}</td>
      <td>${paciente.rut}</td>
      <td>${paciente.diagnostico}</td>
    </tr>
    `;

  })
});


//Agregar un paciente
document.querySelector('#agregar').addEventListener("click", function (ev) {
  ev.preventDefault();
  
  //Renderiza el formulario
  document.querySelector('#main').innerHTML = formularioPaciente;
  console.log("me estoy ejecutando");

  let formulario =  document.querySelector("#formulario-paciente");

  formulario.addEventListener("submit", function(ev){
    ev.preventDefault();
    let nombre = formulario.querySelector("#nombre").value;
    let edad = formulario.querySelector("#edad").value;
    let rut = formulario.querySelector("#rut").value;
    let diagnostico = formulario.querySelector("#diagnostico").value;

    let newPaciente = new Paciente(nombre, edad, rut, diagnostico);
    
    consultorio.agregarPaciente(newPaciente);
    console.log(consultorio);

    let cuerpoNuevoArreglo = consultorio.mostrarPacientes().map(function (elemento) {
      return `
        <tr class="odd:bg-gray-100">
          <td>${elemento.nombre}</td>
          <td>${elemento.edad}</td>
          <td>${elemento.rut}</td>
          <td>${elemento.diagnostico}</td>
        </tr>
      `
    });
  
    crearTabla("#main", "#cuerpo", tabla, cuerpoNuevoArreglo);
  });
  
});

