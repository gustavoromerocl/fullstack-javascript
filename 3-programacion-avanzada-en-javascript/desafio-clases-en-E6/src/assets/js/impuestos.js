export default class Impuestos {
  constructor(montoBrutoAnual, deducciones){
    let _montoBrutoAnual = montoBrutoAnual;
    let _deducciones = deducciones;

    this._getMontoBrutoAnual = () => _montoBrutoAnual;
    this._setMontoBrutoAnual = (montoBrutoAnual) => _montoBrutoAnual = montoBrutoAnual;
    this._getDeducciones = () => _deducciones;
    this.setDeducciones = (deducciones) => _deducciones = deducciones;
  }

  //getters y setters
  get montoBrutoAnual(){
    return this._getMontoBrutoAnual;
  }

  set montoBrutoAnual(nuevoMonto){
    this._setMontoBrutoAnual(nuevoMonto);
  }

  get deducciones(){
    return this._getDeducciones;
  }

  set deducciones(nuevasDeducciones){
    this._setDeducciones(nuevasDeducciones);
  }
}