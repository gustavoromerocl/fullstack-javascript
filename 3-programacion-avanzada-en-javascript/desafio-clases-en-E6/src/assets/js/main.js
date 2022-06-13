import  Cliente  from './cliente.js';
import Impuestos from './impuestos.js';

//Declaramos una variable que contenga una instancia de la clase Impuesto
let impuesto = new Impuestos(500000, 20000);

//Declaramos una variable que contenga una instancia de la clase Cliente
let c1 = new Cliente("Gustavo", impuesto);

//Ejecutamos el método calcular impuesto
console.log(c1.calcularImpuesto());
