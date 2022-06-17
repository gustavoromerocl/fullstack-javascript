/* 
1. Implementar el Patrón Módulo mediante IIFE, en donde:
- Se cree una función privada que reciba la url del video y el id de la etiqueta
iframe, para así poder mostrar los videos en el documento HTML. Dato:
puedes utilizar la instrucción “setAttribute” para manipular el DOM.
- Se retorne una función pública que reciba los parámetros (url, id), y realice el
llamado a la función interna (privada) para insertar los elementos recibidos.
*/

const pmodulo = (() => {
  const privateFunction = (url, id) => {
    let iframe = document.querySelector(`#${id}`);
    iframe.setAttribute('src', url)
/*     console.log(url, id, iframe) */
  } 

  return {
    publicFunction: (url, id) => privateFunction(url, id)
  }

})() 


pmodulo.publicFunction("https://www.youtube.com/embed/gKnG2WKtvgc", "musica")