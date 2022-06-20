/* 
1. Implementar el Patrón Módulo mediante IIFE, en donde:
- Se cree una función privada que reciba la url del video y el id de la etiqueta
iframe, para así poder mostrar los videos en el documento HTML. Dato:
puedes utilizar la instrucción “setAttribute” para manipular el DOM.
- Se retorne una función pública que reciba los parámetros (url, id), y realice el
llamado a la función interna (privada) para insertar los elementos recibidos.
*/

const pmodulo = (() => {
  //Scope privado
  const privateFunction = (url, id) => {
    let iframe = document.querySelector(`#${id}`);
    iframe.setAttribute('src', url);
    //console.log(url,id, iframe);
  }

  return {
    //Scope publico
    publicFunction: (url, id) => privateFunction(url, id),
  }

})()


/* 2. Establecer una clase padre denominada Multimedia para:
- Recibir la propiedad url, ejemplo:
“https://www.youtube.com/embed/5PSNL1qE6VY”, la cual será el atributo
src que necesite la etiqueta iframe para poder mostrar el video.
- Proteger el atributo de la clase implementado closures.
- Agregar un método denominado “setInicio”, que retorne el siguiente mensaje:
“Este método es para realizar un cambio en la URL del video”. */

class Multimedia {
  constructor(url) {
    let _url = url

    this._getUrl = () => _url
  }

  get url() {
    return this._getUrl()
  }

  setInicio() {
    return "Este método es para realizar un cambio en la URL del video"
  }
}


/* 3. Crear una clase “Reproductor”, siendo hija de la clase padre Multimedia para:
- Recibir la propiedad id, la cual será el elemento del DOM que se necesita para
poder agregar la URL en la etiqueta iframe que corresponda. Por ejemplo: Si
se envía una URL para Música, el id debe ser el perteneciente a la etiqueta
iframe que se encuentra en la sección de música. 

- Crear un método denominado “playMultimedia”, que permita hacer el llamado
a la función pública de la IIFE, enviando los atributos url y id.
- Agregar un método denominado “setInicio”, que reciba y agregue un tiempo
de inicio a la URL de la etiqueta iframe. Se puede utilizar el método
“setAttribute” para modificar la URL agregando al final de la misma lo
siguiente: “?start=${tiempo}”. Esto permitirá que cualquiera de los videos que
implemente el método inicie en el tiempo pasado como argumento al método
al ser invocado.
*/

class Reproductor extends Multimedia {
  constructor(url, id) {
    super(url)
    let _id = id

    this._getId = () => _id
  }

  get id() {
    return this._getId();
  }

  playMultimedia() {
    pmodulo.publicFunction(this.url, this.id)
  }

  setInicio(tiempo) {
    let iframe = document.querySelector(`#${this.id}`)
    //Se agrega autoplay y muted mediante params para la ejecución automatica, además de pasarle el tiempo de delay
    iframe.setAttribute('src', `${this.url}?start=${tiempo}&autoplay=1&mute=1`)
  }
}

/* 4. Instanciar la clase hija pasando como argumento la URL y el id para cada etiqueta
iframe, por lo que se deben crear tres instancias, una para música, otra para película
y otra para serie, con sus respectivas URL. */

let musicFrame = new Reproductor("https://www.youtube.com/embed/gKnG2WKtvgc", "musica")
let moviesFrame = new Reproductor("https://www.youtube.com/embed/w1LlVkkZg1k", "peliculas")
let seriesFrame = new Reproductor("https://www.youtube.com/embed/mpEvxTId_2A", "series")

/* 5. Invocar al método “playMultimedia” para cada instancia creada, mostrando así los
videos en el documento HTML. */

musicFrame.playMultimedia()
moviesFrame.playMultimedia()
seriesFrame.playMultimedia()

/* 6. Utiliza el método “setInicio” para modificar el tiempo de inicio en alguna de las
instancias creadas. */

musicFrame.setInicio(2)
moviesFrame.setInicio(4)
seriesFrame.setInicio(6)
