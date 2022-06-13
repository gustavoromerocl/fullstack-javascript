"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Cliente = /*#__PURE__*/function () {
  function Cliente(nombre, impuesto) {
    _classCallCheck(this, Cliente);

    var _nombre = nombre;
    var _impuesto = impuesto;

    this._getNombre = function () {
      return _nombre;
    };

    this._setNombre = function (nombre) {
      return _nombre = nombre;
    };

    this._getImpuesto = function () {
      return _impuesto;
    };
  } //getters y setters


  _createClass(Cliente, [{
    key: "nombre",
    get: function get() {
      return this._getNombre;
    },
    set: function set(nuevoNombre) {
      this._setNombre(nuevoNombre);
    }
  }, {
    key: "impuesto",
    get: function get() {
      return this._getImpuesto;
    } //Caculamos el impuesot según la formula del desafío

  }, {
    key: "calcularImpuesto",
    value: function calcularImpuesto() {
      var resultado = (this.impuesto().montoBrutoAnual() - this.impuesto().deducciones()) * 0.21;
      return resultado;
    }
  }]);

  return Cliente;
}();

exports["default"] = Cliente;