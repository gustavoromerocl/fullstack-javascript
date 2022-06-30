// nombre, edad, img, comentarios, sonido
import Animal from './animal.js'

class Oso extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }

    grunir(){
        return `assets/sounds/${this.sonido}`
    }
}
export default Oso;