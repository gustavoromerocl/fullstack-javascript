/** 2. Tooltip: Incluir un botón "Enviar por correo"... */
/** Tooltip*/
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/** 3. Evento: Utilizar el evento “click” de jquery para mostrar una alerta al hacer un clic
sobre el botón de "Enviar por Correo" mediante el uso de los selectores por Id... */
/** Evento Click */
$(function () {
  $('#enviarCorreo').click(function () {
    alert('El correo fue enviado correctamente...')
  })
  /** Extra - boton favoritos */
  $('#favoritos').click(function () {
    alert('Se ha agregado esta receta a tus favoritos...')
  })
})

/** 4. Selectores de etiqueta: Utilizando los selectores de etiqueta y el método de jQuery
`on` con el evento `dblclick`, solamente modificar el color del texto de los títulos...*/
/** Evento Doble Click */
$(document).ready(function () {
  $('#ingredientes').on('dblclick', function (event) {
    $(this).css({
      "color": "red"
    })
  })
  $('#preparacion').on('dblclick', function (event) {
    $(this).css({
      "color": "red"
    })
  })
})

/** 5. Selectores de clase: Implementar los selectores de clases, utilizar el método de
jQuery denominado `toggle` para hacer desaparecer y aparecer el contenido...*/
/** Evento Toggle */
$(function () {
  $('.card-title').click(function () {
    $('.card-text').toggle()
  })
})

/** Extra - Se aplica funcionalidad al boton "Empezar" de la última sección*/
$(function () {
  $('#empezar').click(function () {
    alert('Gracias por su preferencia...')
  })
})