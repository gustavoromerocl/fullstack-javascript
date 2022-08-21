const chai = require('chai');

describe('Operatorias: Valida las operatorias basicas de las matematicas.', () => {
  it('1- Testea la Suma de dos numeros.', () => {
    const num1 = 20;
    const num2 = 10;
    const suma = num1 + num2;
    chai.expect(suma).to.equal(30);
  });

  it('2- Testea la Resta de dos numeros.', () => {
    const num1 = 20;
    const num2 = 10;
    const resta = num1 - num2;
    chai.expect(resta).to.equal(10);
  });

  it('3- Testea la Multiplicacion de dos numeros.', () => {
    const num1 = 20;
    const num2 = 10;
    const multi = num1 * num2;
    chai.expect(multi).to.equal(200);
  });

  it('4- Testea la Division de dos numeros.', () => {
    const num1 = 20;
    const num2 = 10;
    const divi = num1 / num2;
    chai.expect(divi).to.equal(2);
  });
});
