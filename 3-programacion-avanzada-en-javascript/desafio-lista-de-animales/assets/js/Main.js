// Propietario tiene una o mas mascotas
// mascota tiene un Propietario
// mascota es un Animal
import Mascota from './Class/Mascota.js'

let creaMascotaClinica = (animal) => {
    let divResultado = document.getElementById('resultado')
    let liUno = animal.datosPropietario()
    let liDos = `${animal.tipoAnimal}, mientras que el nombre de la mascota es: ${animal.nombreMascota} y la enfermerdad es: ${animal.diagnosticoMascota}`
    let ulDelDiv = divResultado.querySelector('ul')
    ulDelDiv.innerHTML = `<li>${liUno}</li><li>${liDos}</li>`
    formulario.reset();
}

let datos = (event) => {
    event.preventDefault()
    let nombre_propietario = document.getElementById('propietario').value
    let telefono_propietario = document.getElementById('telefono').value
    let direccion_propietario = document.getElementById('direccion').value
    let tipo_animal = document.getElementById('tipo').value
    let nombre_mascota = document.getElementById('nombreMascota').value
    let diagnostico_mascota = document.getElementById('enfermedad').value

    if (tipo_animal == 'gato') {
        let gato = new Mascota(nombre_propietario, telefono_propietario, direccion_propietario, tipo_animal, nombre_mascota, diagnostico_mascota)
        creaMascotaClinica(gato)
    } else if(tipo_animal == 'perro'){
        let perro = new Mascota(nombre_propietario, telefono_propietario, direccion_propietario, tipo_animal, nombre_mascota, diagnostico_mascota)
        creaMascotaClinica(perro)
    }else {
        let conejo = new Mascota(nombre_propietario, telefono_propietario, direccion_propietario, tipo_animal, nombre_mascota, diagnostico_mascota)
        creaMascotaClinica(conejo)
    }

}

let formulario = document.querySelector("form")
formulario.addEventListener("submit", datos)
