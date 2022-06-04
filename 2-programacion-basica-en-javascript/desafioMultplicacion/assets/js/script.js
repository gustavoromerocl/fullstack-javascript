let numeroUsuario;

// validacion del dato dentro del intervalo requerido
do {
  numeroUsuario = prompt("Ingresar numero")
  if(numeroUsuario <0 || numeroUsuario>20){
    alert("Numero fuera de rango");
  }
}while (numeroUsuario <0 || numeroUsuario>20);



// funcion para hacer el calculo del factorial. 
const factorial = (numero) => {
	let total = 1; 
	for (let i=1; i<=numero; i++) {
		total = total * i;
	}
	return total; 
}

// funcion para hacer el calculo de multiplicacion
const multiplicacion = (numero) => {
  let resultado = 0;
  for (let i=0 ; i<numero ; i++ ){
    resultado = parseInt(numero)*(i+1);
    document.write(`<p>${numero} x ${i+1} = ${resultado} </p>`);
  }
}

// llamada  a la funcion declarada
multiplicacion(numeroUsuario);

// ciclo for anidado para obtener factorial
for (let i=0; i<numeroUsuario; i++){
  document.write(`<p>Factorial de ${i+1} es: ${factorial(i+1)} </p>`);
}
