import Leon from "./clases/leon.js";
import Lobo from "./clases/lobo.js";
import Oso from "./clases/oso.js";
import Serpiente from "./clases/serpiente.js";
import Aguila from "./clases/aguila.js";

// Captura de datos Html por Id
const btnAgregar = document.querySelector("#btnRegistrar");
const animalSelected = document.querySelector("#animal");
const edadSelected = document.querySelector("#edad");
const comentarioSelected = document.querySelector("#comentarios");
const preview = document.querySelector('#preview');
const results = document.querySelector('#animales-container');
const audio = document.querySelector('#player');
const modal = document.querySelector('.modal-body');

let animales;
let animalesArray = [];


btnAgregar.addEventListener("click", async () => {
  
  // Validacion de datos no esten Vacios
  if(validate()) return;
  
  /* const animales = await fetchData(); */

  const [filtro] = animales.filter(element => element.name === animalSelected.value);

  // 2. Crear las instancias de las clases utilizando los datos del formulario.
  switch (animalSelected.value) {
    case "Leon":
      const leon = new Leon(
        animalSelected.value,
        edadSelected.value,
        filtro.imagen,
        comentarioSelected.value,
        filtro.sonido
      );

      animalesArray.push(leon);
      renderAnimals(animalesArray);
      cleanForm();
      break;
    case "Lobo":
      const lobo = new Lobo(
        animalSelected.value,
        edadSelected.value,
        filtro.imagen,
        comentarioSelected.value,
        filtro.sonido
      );

      animalesArray.push(lobo);
      renderAnimals(animalesArray);
      cleanForm();
      break;
    case "Oso":
      const oso = new Oso(
        animalSelected.value,
        edadSelected.value,
        filtro.imagen,
        comentarioSelected.value,
        filtro.sonido
      );

      animalesArray.push(oso);
      renderAnimals(animalesArray);
      cleanForm();
      break;
    case "Serpiente":
      const serpiente = new Serpiente(
        animalSelected.value,
        edadSelected.value,
        filtro.imagen,
        comentarioSelected.value,
        filtro.sonido
      );

      animalesArray.push(serpiente);
      renderAnimals(animalesArray);
      cleanForm();
      break;
    case "Aguila":
      const aguila = new Aguila(
        animalSelected.value,
        edadSelected.value,
        filtro.imagen,
        comentarioSelected.value,
        filtro.sonido
      );

      animalesArray.push(aguila);
      renderAnimals(animalesArray);
      cleanForm();
    default:
      break;
  }
});

/* 3. Realizar una consulta asíncrona utilizando una función async/await para obtener las
imágenes correspondientes a los animales. (1 Punto) */
animalSelected.addEventListener("change", (ev) => {
  let element = ev.target.value;
  buscarAnimales(element);
});

const buscarAnimales = async (animal) => {
  try {
    /* const animales = await fetchData(); */
    const [filtro] = await animales.filter(element => element.name === animal);
    preview.style.backgroundImage = `url(assets/imgs/${filtro.imagen})`;
  } catch (e) {
    preview.style.backgroundImage = `url(assets/imgs/lion.svg)`;
  }
}

/* 
4. Realizar por lo menos una función autoejecutable IIFE. (1 Punto)
*/

(async () => {
  const response = await fetch('animales.json');
  const { animales: data } = await response.json();

  animales = data;
})()

/* 
5. Dividir el código en módulos (2 Puntos)
*/

/* 
6. Utilizar la manipulación del DOM para mostrar en la tabla los animales registrados
con el formulario. (2 Puntos)
*/

const renderAnimals = (animales) => {

  const animalCard = animales.map((element, index) => `
    <div class="col mb-4">
      <div class="card">
        <div>
          <img src="assets/imgs/${element.img}" onclick="animalModal('${index}')" data-toggle="modal" data-target="#exampleModal" class="card-img-top" height="250px">
        </div>
        <div class="rounded-top-0">
          <button onclick="playSound('${index}')" class="btn btn-secondary w-100 "> <img height="30" src="assets/imgs/audio.svg" /> </button>
        </div>
      </div>
    </div>
  `)

  results.innerHTML = animalCard.join('');
}

/* 7. Validar que el usuario haya asignado todos los datos del animal antes de que éste
sea agregado a la tabla. (Opcional) */

const validate = () => {
  if (animalSelected.value === "Seleccione un animal") {
    alert("debe seleccionar un animal");
    return true;
  }
  if (edadSelected.value === "Seleccione un rango de años") {
    alert("debe seleccionar un Rango de años");
    return true;
  }
  if (comentarioSelected.value === "") {
    alert("debe ingresar un comentario");
    return true;
  }

  return false;
}

/* 8. Devolver el formulario en un estado inicial luego de registrar a cada animal.
(Opcional) */

const cleanForm = () => {
  animalSelected.value = "Seleccione un animal";
  edadSelected.value = "Seleccione un rango de años";
  comentarioSelected.value = "";
  preview.style.backgroundImage = `url(assets/imgs/lion.svg)`;
}

/* 9. Programar la interacción del botón de audio, en donde deberás reproducir el sonido
del animal en el sitio web. (Opcional) */

window.playSound = (index) => {
  let path;
  const animal = animalesArray[index];
  console.log(animal.nombre);
  if (animal.nombre === "Leon") path = animal.rugir();
  if (animal.nombre === "Lobo") path = animal.aullar();
  if (animal.nombre === "Oso") path = animal.grunir();
  if (animal.nombre === "Aguila") path = animal.chillar();
  if (animal.nombre === "Serpiente") path = animal.sisear();

  audio.src = path;

  audio.play();
}

/* 10. Mostrar el detalle de cada animal en una ventana modal al ser presionada su
imagen. (Opcional) */

window.animalModal = (index) => {
  let animal = animalesArray[index]
  const modalCard = `
  <div class="px-3 pb-2 especie">
    <div class="card bg-transparent border-0">
      <img src="assets/imgs/${animal.img}" data-toggle="modal" data-target="#exampleModal" class="card-img-top">
      <div class="card-body text-white">
        <h3>${animal.edad}</h3>
        <h3>Comentarios</h3>
        <hr>
          <p>${animal.comentarios}</p>
      </div>
    </div>
  </div>
  `

  modal.innerHTML = modalCard;
}


