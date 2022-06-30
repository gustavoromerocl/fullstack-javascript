// nombre, edad, img, comentarios, sonido
import Animal from './animal.js'

class Lobo extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
      super(nombre, edad, img, comentarios, sonido);
    }
    
    aullar(){
      return `assets/sounds/${this.sonido}`
    }
}
 export default Lobo;