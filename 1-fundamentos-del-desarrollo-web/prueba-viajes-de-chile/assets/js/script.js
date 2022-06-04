$(function () {
  $("a").click(function (event) {
    // Con este if se asegura que this.hash tenga un valor antes de anular el comportamiento predeterminado
    if (this.hash !== "") {
      // Previene el comportamiento de click predeterminado
      event.preventDefault();
      // Guarda el valor del hash en una variable llamada gato
      var gato = this.hash;
      console.log(gato);
      // Usa el método animate para animar el scroll y hacerlo de una forma suave
      // El número opciona (800) especifica el número de milisegundos quese demorara en llegar hasta el área
      $('html, body').animate({
        scrollTop: $(gato).offset().top
      }, 800, function () {
      // Agrega hash (#) a la URL cuando haya terminado de desplazarse (comportamiento de click predeterminado)
        window.location.hash = gato;
      });
    } // Fin del if
  });

  /*Necesario para implementar popover */
  $('[data-toggle="popover"]').popover();

});


