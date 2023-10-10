const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('API Tests', () => {

//   describe('GET /clientes', () => {
//     it('Debería devolver todos los clientes', (done) => {
//       chai.request(app)
//         .get('/clientes')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });

//   describe('GET /clientes/:id', () => {
//     it('Debería devolver un cliente por su ID', (done) => {
//       const id = 1;
//       chai.request(app)
//         .get(`/clientes/${id}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });

//   // Tests para Productos
//   describe('GET /productos/:id', () => {
//     it('Debería devolver un producto por su ID', (done) => {
//       const id = 1;
//       chai.request(app)
//         .get(`/productos/${id}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });

//   describe('POST /productos', () => {
//     it('Debería crear un nuevo producto', (done) => {
//       const producto = {
//         marca: 'TestMarca',
//         nombre: 'TestNombre',
//         descripcion: 'TestDescripcion',
//         precio: 50.0,
//         stock: 10
//       };
//       chai.request(app)
//         .post('/productos')
//         .send(producto)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });

// // Tests para actualizar Cliente
// describe('PUT /clientes/:id', () => {
//     it('Debería actualizar un cliente por su ID', (done) => {
//       const id = 1;  // Asegúrate de que este ID exista en tu base de datos
//       const nuevoCliente = {
//         nombre: 'NuevoNombre',
//         apellido: 'NuevoApellido',
//         direccion: 'NuevaDireccion',
//         activo: 1
//       };
//       chai.request(app)
//         .put(`/clientes/${id}`)
//         .send(nuevoCliente)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });
  
//   // Tests para eliminar Cliente
//   describe('DELETE /clientes/:id', () => {
//     it('Debería eliminar un cliente por su ID', (done) => {
//       const id = 1;  // Asegúrate de que este ID exista en tu base de datos
//       chai.request(app)
//         .delete(`/clientes/${id}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });
  
//   // Tests para actualizar Producto
//   describe('PUT /productos/:id', () => {
//     it('Debería actualizar un producto por su ID', (done) => {
//       const id = 1;  // Asegúrate de que este ID exista en tu base de datos
//       const nuevoProducto = {
//         marca: 'NuevaMarca',
//         nombre: 'NuevoNombre',
//         descripcion: 'NuevaDescripcion',
//         precio: 60.0,
//         stock: 12
//       };
//       chai.request(app)
//         .put(`/productos/${id}`)
//         .send(nuevoProducto)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });
  
//   // Tests para eliminar Producto
//   describe('DELETE /productos/:id', () => {
//     it('Debería eliminar un producto por su ID', (done) => {
//       const id = 1;  // Asegúrate de que este ID exista en tu base de datos
//       chai.request(app)
//         .delete(`/productos/${id}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });
});
