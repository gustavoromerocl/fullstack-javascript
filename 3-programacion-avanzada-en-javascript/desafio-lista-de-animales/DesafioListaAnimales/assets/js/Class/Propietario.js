export default class Propietario {
    constructor(nombre_propietario, telefono_propietario, direccion_propietario) {
        let _nombrePropietario = nombre_propietario || 'Juan'
        this._getNombrePropietario = () => _nombrePropietario
        this._setNombrePropietario = (nombre_propietario) => nombre_propietario != '' ? _nombrePropietario = nombre_propietario : _nombrePropietario = 'Juan'

        let _telefonoPropietario = telefono_propietario || '123456789'
        this._getTelefonoPropietario = () => _telefonoPropietario
        this._setTelefonoPropietario = (telefono_propietario) => telefono_propietario != '' ? _telefonoPropietario = telefono_propietario : _telefonoPropietario = '123456789'
        
        let _direccionPropietario = direccion_propietario || 'Chile'
        this._getDireccionPropietario = () => _direccionPropietario
        this._setDireccionPropietario = (direccion_propietario) => direccion_propietario != '' ? _direccionPropietario = direccion_propietario : _direccionPropietario = 'Chile'
    }

    // getters y setters
    get nombrePropietario() {
        return this._getNombrePropietario()
    }
    set nombrePropietario(nombre_propietario) {
        this._setNombrePropietario(nombre_propietario)
    }

    get telefonoPropietario() {
        return this._getTelefonoPropietario()
    }
    set telefonoPropietario(telefono_propietario) {
        this._setTelefonoPropietario(telefono_propietario)
    }

    get direccionPropietario() {
        return this._getDireccionPropietario()
    }
    set direccionPropietario(direccion_propietario) {
        this._setDireccionPropietario(direccion_propietario)
    }

    datosPropietario() {
        // console.log(${this.nombrePropietario})
        return `El nombre del dueño es: ${this.nombrePropietario}. El domicilio es: ${this.direccionPropietario},  y el número telefónico de contacto:  ${this.telefonoPropietario}`
    }
}