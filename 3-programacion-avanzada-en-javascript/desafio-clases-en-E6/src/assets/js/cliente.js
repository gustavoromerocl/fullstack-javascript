export default class Cliente {
  constructor(nombre, impuesto) {
    let _nombre = nombre;
    let _impuesto = impuesto;
    
    this._getNombre = () => _nombre;
    this._setNombre = (nombre) => _nombre = nombre; 
    this._getImpuesto = () => _impuesto;

  }

  //getters y setters
  get nombre() {
    return this._getNombre;
  }

  set nombre(nuevoNombre) {
    this._setNombre(nuevoNombre);
  }

  get impuesto() {
    return this._getImpuesto;
  }

  //Caculamos el impuesot según la formula del desafío
  calcularImpuesto() {
    let resultado = ((this.impuesto().montoBrutoAnual() - this.impuesto().deducciones()) * 0.21);
    return resultado;
  }
}