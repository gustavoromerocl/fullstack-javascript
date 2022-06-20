import Animal from './Animal.js'

export default class Mascota extends Animal {
    constructor(nombre_propietario, telefono_propietario, direccion_propietario, tipo_animal, nombre_mascota, diagnostico_mascota){
        super(nombre_propietario, telefono_propietario, direccion_propietario, tipo_animal)

        let _nombreMascota = nombre_mascota || 'Tatty'
        this._getNombreMascota = () => _nombreMascota
        this._setNombreMascota = (nombre_mascota) => nombre_mascota != '' ? _nombreMascota = nombre_mascota : _nombreMascota = 'Tatty'

        let _diagnosticoMascota = diagnostico_mascota || 'otitis leve'
        this._getDiagnosticoMascota = () => _diagnosticoMascota
        this._setDiagnosticoMascota = (diagnostico_mascota) => diagnostico_mascota != '' ? _diagnosticoMascota = diagnostico_mascota : _diagnosticoMascota = 'otitis leve'
    }

    // getters y setters
    get nombreMascota() {
        return this._getNombreMascota()
        
    }
    set nombreMascota(nombre_mascota) {
        this._setNombreMascota(nombre_mascota)
    }

    get diagnosticoMascota() {
        return this._getDiagnosticoMascota()
        
    }
    set diagnosticoMascota(diagnostico_mascota) {
        this._setDiagnosticoMascota(diagnostico_mascota)
    }
    
}