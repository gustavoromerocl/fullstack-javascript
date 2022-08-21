const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index.js');

chai.use(chaiHttp);

describe('Server: Testeando mi API REST FULL', () => {
  it('1- GET /user : Esta ruta debe retornar un "object", con una propiedad "users" que a su vez es un "array", y el status code debe ser "200".', () => {
    chai
      .request(server)
      .get('/user')
      .end((err, response) => {
        chai.expect(err).to.be.null;
        chai.expect(response).to.have.status(200);
        chai.expect(response.body).to.be.an('object');
        chai.expect(response.body).to.have.property('users');
        chai.expect(response.body.users).to.be.an('array');
      });
  });

  it('2- POST /newUser : Esta ruta recibir un user y retornar con codigo 201 y un objeto con las propiedades "code" y "message".', () => {
    chai
      .request(server)
      .post('/newUser')
      .send({ user: 'Carlos', pass: "12345" })
      .end((err, response) => {
        chai.expect(err).to.be.null;
        chai.expect(response).to.have.status(201);
        chai.expect(response.body).to.be.an('object');
        chai.expect(response.body).to.have.property('code');
        chai.expect(response.body.code).to.equal(201);
        chai.expect(response.body).to.have.property('message');
        chai.expect(response.body.message).to.be.a('string');
      })
  });
});
