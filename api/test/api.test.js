const request = require('supertest');
const { expect } = require('@jest/globals');
const app = require('../app');

describe('Clientes API', () => {
  it('GET /clientes', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toEqual(200);
  });

  it('POST /clientes', async () => {
    const nuevoCliente = {
      nro_cliente: 200,
      nombre: 'Nicolas',
      apellido: 'SD',
      direccion: 'Paz 300',
      activo: 150
    };
    const res = await request(app).post('/clientes').send(nuevoCliente);
    expect(res.statusCode).toEqual(201);
  });

  it('GET /clientes/:id', async () => {
    const res = await request(app).get('/clientes/200');
    expect(res.statusCode).toEqual(200);
  });

  it('PUT /clientes/:id', async () => {
    const actualizacion = {
      nombre: 'Adolfo',
      apellido: 'Rosauer',
      direccion: 'Libertador 300',
      activo: 177
    };
    const res = await request(app).put('/clientes/200').send(actualizacion);
    expect(res.statusCode).toEqual(200);
  });

  it('DELETE /clientes/:id', async () => {
    const res = await request(app).delete('/clientes/200');
    expect(res.statusCode).toEqual(200);
  });
});

describe('Productos API', () => {
  it('GET /productos', async () => {
    const res = await request(app).get('/productos');
    expect(res.statusCode).toEqual(200);
  });

  it('POST /productos', async () => {
    const nuevoProducto = {
      codigo_producto: 111,
      marca: 'Coca-Cola',
      nombre: 'zero',
      descripcion: 'lata 500ml',
      precio: 500,
      stock: 777
    };
    const res = await request(app).post('/productos').send(nuevoProducto);
    expect(res.statusCode).toEqual(201);
  });

  it('GET /productos/:id', async () => {
    const res = await request(app).get('/productos/111');
    expect(res.statusCode).toEqual(200);
  });

  it('PUT /productos/:id', async () => {
    const actualizacion = {
      marca: 'Coca-Cola',
      nombre: 'light',
      descripcion: 'botella 1500ml',
      precio: 1000,
      stock: 333
    };
    const res = await request(app).put('/productos/111').send(actualizacion);
    expect(res.statusCode).toEqual(200);
  });

  it('DELETE /productos/:id', async () => {
    const res = await request(app).delete('/productos/111');
    expect(res.statusCode).toEqual(200);
  });
});

