// nombre, edad, img, comentarios, sonido
import Animal from "./animal.js";

class Aguila extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  chillar() {
    return `assets/sounds/${this.sonido}`
  }
}
export default Aguila;
