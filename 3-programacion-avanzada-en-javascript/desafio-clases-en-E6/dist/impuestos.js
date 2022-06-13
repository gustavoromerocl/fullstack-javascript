"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Impuestos = /*#__PURE__*/function () {
  function Impuestos(montoBrutoAnual, deducciones) {
    _classCallCheck(this, Impuestos);

    var _montoBrutoAnual = montoBrutoAnual;
    var _deducciones = deducciones;

    this._getMontoBrutoAnual = function () {
      return _montoBrutoAnual;
    };

    this._setMontoBrutoAnual = function (montoBrutoAnual) {
      return _montoBrutoAnual = montoBrutoAnual;
    };

    this._getDeducciones = function () {
      return _deducciones;
    };

    this.setDeducciones = function (deducciones) {
      return _deducciones = deducciones;
    };
  } //getters y setters


  _createClass(Impuestos, [{
    key: "montoBrutoAnual",
    get: function get() {
      return this._getMontoBrutoAnual;
    },
    set: function set(nuevoMonto) {
      this._setMontoBrutoAnual(nuevoMonto);
    }
  }, {
    key: "deducciones",
    get: function get() {
      return this._getDeducciones;
    },
    set: function set(nuevasDeducciones) {
      this._setDeducciones(nuevasDeducciones);
    }
  }]);

  return Impuestos;
}();

exports["default"] = Impuestos;