

//console.log("Hola mundo");

const form = document.querySelector('form');

form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  form.submit();
})