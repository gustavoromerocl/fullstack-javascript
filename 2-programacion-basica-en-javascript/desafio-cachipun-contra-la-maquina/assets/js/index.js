/**Desafío 2 */

/**Recibir la cantidad de veces que el usuario desea repetir el juego */
let repeticiones = prompt("¿Cuantas veces quieres repetir el juego?");
let contador = 0;
let resultado;
let arreglo = [];

while (contador < repeticiones) {
  //contador = contador + 1;
  //contador += 1;
  ++contador;
  let jugadaUsuario = prompt("Ingresa la opción de tu jugada [ tijera[0] - papel[1] - piedra[2] ]: ");
  let jugadaCPU = Math.floor(Math.random() * 3); //Juagada aleatoria de la cpu
  jugadaUsuario = parseInt(jugadaUsuario); //Transformamos el valor recibido en un número entero

  if (jugadaUsuario === 0 && jugadaCPU === 0) {resultado = "Empate"; alert(resultado); calculoFinal(resultado)};
  if (jugadaUsuario === 0 && jugadaCPU === 1) {resultado = "Ganaste"; alert(resultado); calculoFinal(resultado)};
  if (jugadaUsuario === 0 && jugadaCPU === 2) {resultado = "Derrota"; alert(resultado); calculoFinal(resultado)};

  if (jugadaUsuario === 1 && jugadaCPU === 0) {resultado = "Derrota"; alert(resultado); calculoFinal(resultado)};
  if (jugadaUsuario === 1 && jugadaCPU === 1) {resultado = "Empate"; alert(resultado); calculoFinal(resultado)};
  if (jugadaUsuario === 1 && jugadaCPU === 2) {resultado = "Ganaste"; alert(resultado); calculoFinal(resultado)};

  if (jugadaUsuario === 2 && jugadaCPU === 0) {resultado = "Ganaste"; alert(resultado); calculoFinal(resultado)};
  if (jugadaUsuario === 2 && jugadaCPU === 1) {resultado = "Derrota"; alert(resultado); calculoFinal(resultado)};
  if (jugadaUsuario === 2 && jugadaCPU === 2) {resultado = "Empate"; alert(resultado); calculoFinal(resultado)};
}

function calculoFinal(resultado){
  /**spread operator */
  arreglo = [...arreglo, resultado];
} 

function imprimirResumen(resultados){
  victoria = 0;
  derrota = 0;

  resultados.forEach(resultado => {
    if(resultado === "Ganaste") victoria += 1;
    if(resultado === "Derrota") derrota +=1;
  })

  
  if(derrota === victoria) return alert("Los jugadores han empatado");
  
  /**Operador ternario */
  return victoria > derrota ? alert(`Eres el ganador con ${victoria} victorias`) : alert(`Has sido derrotado`);
}

imprimirResumen(arreglo);






