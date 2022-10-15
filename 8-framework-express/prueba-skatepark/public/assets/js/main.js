const registerForm = document.getElementById('register-form');
const authForm = document.getElementById('auth-form');

// REGISTER FORM
registerForm && registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const [
      { value: email },
      { value: nombre },
      { value: password },
      { value: passwordRepeat },
      { value: anos_experiencia },
      { value: especialidad },
      image,
    ] = e.target;

    let formData = new FormData();
    let imagefile = document.querySelector('#profileImage');
    
    if(password !== passwordRepeat) return alert('Las contraseñas ingresadas deben coincidir');

    formData.append("image", imagefile.files[0]);

    const payload = { email, nombre, password, anos_experiencia, especialidad, foto: image.files[0].name};

    const { data } = await axios.post('/upload', formData, {
      Headers: { 
        'Content-Type': 'multipart/form-data',
      }
    });

    if(!data.success) return alert('Error al subir la imagen');

    await axios.post('/users', payload);

    window.location.replace('/');
  } catch (error) {
    if (error) return alert('Ha ocurrido unn error al realizar el registro');
  }
});

//AUTH
authForm && authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const [{ value: email }, { value: password }] = e.target;
    const payload = { email, password };
    const { data } = await axios.post('/auth', payload);
    const { jwt } = data;
    if (!jwt) return alert('Credenciales invalidas');
    localStorage.setItem('skaters.token', jwt);
    window.location.replace(`/profile?token=${jwt}`)

  } catch (error) {
    if (error) return alert('Credenciales invalidas');
  }
});

const destroySession = (e) => {
  e.preventDefault()

  window.localStorage.removeItem('skaters.token');
  window.location.replace('/');
}


const main = () => {
  const token = localStorage.getItem('skaters.token');

  if (token) {
    window.location.pathname.split('?');
    return window.location.replace = `/profile?token=${token}`;
  }
}

(() => main())();
