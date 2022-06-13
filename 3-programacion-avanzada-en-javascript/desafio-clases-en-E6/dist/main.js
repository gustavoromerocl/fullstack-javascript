"use strict";

var _cliente = _interopRequireDefault(require("./cliente.js"));

var _impuestos = _interopRequireDefault(require("./impuestos.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Declaramos una variable que contenga una instancia de la clase Impuesto
var impuesto = new _impuestos["default"](500000, 20000); //Declaramos una variable que contenga una instancia de la clase Cliente

var c1 = new _cliente["default"]("Gustavo", impuesto); //Ejecutamos el método calcular impuesto

console.log(c1.calcularImpuesto());