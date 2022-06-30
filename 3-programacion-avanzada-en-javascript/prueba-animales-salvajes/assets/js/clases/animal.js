// creacion de constructor con sus propiedades
class Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    let _nombre = nombre;
    let _edad = edad;
    let _img = img;
    let _comentarios = comentarios;
    let _sonido = sonido;

    this._getNombre = () => _nombre;
    this._setNombre = (nombre) => (_nombre = nombre);

    this._getEdad = () => _edad;
    this._setEdad = (edad) => (_edad = edad);

    this._getImg = () => _img;
    this._setImg = (img) => (_img = img);

    this._getComentarios = () => _comentarios;
    this._setComentarios = (comentarios) => (_comentarios = comentarios);

    this._getSonido = () => _sonido;
    this._setSonido = (sonido) => (_sonido = sonido);
  }

  get nombre() {
    return this._getNombre();
  }
  set nombre(nombre){
    this._setNombre(nombre)
  }

  get edad () {
    return this._getEdad();
  }
  set edad(edad){
    this._setEdad(edad)
  }

  get img(){
    return this._getImg();
  }
  set img (img){
    this._getImg(img);
  }

  get comentarios(){
    return this._getComentarios();
  }
  set comentarios(comentarios){
    this._setComentarios(comentarios);
  }

  get sonido(){
    return this._getSonido();
  }

  set sonido(sonido){
    this._setSonido(sonido);
  }
}
export default Animal;