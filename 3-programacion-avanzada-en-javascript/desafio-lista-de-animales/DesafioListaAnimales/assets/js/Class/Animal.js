import Propietario from './Propietario.js'

export default class Animal extends Propietario {
    constructor(nombre_propietario, telefono_propietario, direccion_propietario, tipo_animal) {
        super(nombre_propietario, telefono_propietario, direccion_propietario)

        let _tipoAnimal = tipo_animal || 'perro'
        this._getTipoAnimal = () => _tipoAnimal
        this._setTipoAnimal = (tipo_animal) => tipo_animal != '' ? _tipoAnimal = tipo_animal : _tipoAnimal = 'perro'
    }

    // getters y setters
    get tipoAnimal() {
        return `El tipo de animal es un: ${this._getTipoAnimal()}`
        
    }
    set tipoAnimal(tipo_animal) {
        this._setTipoAnimal(tipo_animal)
    }
}