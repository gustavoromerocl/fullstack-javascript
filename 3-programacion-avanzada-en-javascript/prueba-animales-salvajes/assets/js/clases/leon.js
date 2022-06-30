// nombre, edad, img, comentarios, sonido
import Animal from './animal.js'

class Leon extends Animal {
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }
    
    rugir(){
        return `assets/sounds/${this.sonido}`
    }
}
export default Leon;