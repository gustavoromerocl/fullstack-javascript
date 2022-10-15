const cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart);

const addToCart = (e) => {

  console.log(cart);
  console.log(e.parentNode.childNodes[1].innerText);
  cart.push({ name: e.parentNode.childNodes[1].innerText });
  console.log(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
}

const removeToCart = (e) => {
  const index = cart.findIndex((product) => product.name === e.parentNode.childNodes[1].innerText);

  if (index > -1) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
  }
}


(() => {
  const cart = localStorage.getItem('cart');

  if (cart) {

    const modal = document.querySelector('.modal-body');
    const cards = JSON.parse(cart).map(({ name }) => `
    <div class="card" style="width: 9rem; margin: 1rem auto;">
      <img src="assets/img/${name}.png" class="card-img-top" alt="${name}">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <a onclick="removeToCart(this)" class="btn btn-primary" style="display: block; margin: 0 auto;">
        <i class="fa-solid fa-trash"></i>
        </a>
      </div>
     </div>
    `);
    modal.innerHTML = cards.join('');
    return;
  }

  localStorage.setItem('cart', JSON.stringify([]));
})()