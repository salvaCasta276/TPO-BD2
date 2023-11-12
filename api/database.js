const { Pool } = require('pg');
const { MongoClient } = require('mongodb');

console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('User:', process.env.DB_USER);
console.log('Password:', process.env.DB_PASSWORD);
console.log('Database:', process.env.DB_DATABASE);

console.log('Mongo host: ', process.env.MONGO_HOST);
console.log('Mongo port: ', process.env.MONGO_PORT);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const mongoUrl = 'mongodb://'+process.env.MONGO_HOST+':'+process.env.MONGO_PORT;
const mongoClient = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB;

mongoClient.connect((err, client) => {
  if (err) throw err;
  mongoDB = client.db('nombreDeTuBaseDeDatos');
  console.log('Conectado a MongoDB');
});


async function transferirDatos() {
  const clienteSql = await pool.connect();

  try {
    // Transferencia de Clientes
    const resClientes = await clienteSql.query('SELECT * FROM E01_CLIENTE');
    const collectionClientes = mongoDB.collection('clientes');

    for (let cliente of resClientes.rows) {
      const telefonos = await clienteSql.query('SELECT * FROM E01_TELEFONO WHERE nro_cliente = $1', [cliente.nro_cliente]);
      cliente.telefonos = telefonos.rows;
      await collectionClientes.updateOne({ nro_cliente: cliente.nro_cliente }, { $set: cliente }, { upsert: true });
    }

    // Transferencia de Productos
    const resProductos = await clienteSql.query('SELECT * FROM E01_PRODUCTO');
    const collectionProductos = mongoDB.collection('productos');

    for (let producto of resProductos.rows) {
      await collectionProductos.updateOne({ codigo_producto: producto.codigo_producto }, { $set: producto }, { upsert: true });
    }

    // Transferencia de Facturas
    const resFacturas = await clienteSql.query('SELECT * FROM E01_FACTURA');
    const collectionFacturas = mongoDB.collection('facturas');

    for (let factura of resFacturas.rows) {
      const detalles = await clienteSql.query('SELECT * FROM E01_DETALLE_FACTURA WHERE nro_factura = $1', [factura.nro_factura]);
      factura.detalles = await Promise.all(detalles.rows.map(async (detalle) => {
        const producto = await collectionProductos.findOne({ codigo_producto: detalle.codigo_producto });
        detalle.producto_id = producto ? producto._id : null;
        return detalle;
      }));
      await collectionFacturas.updateOne({ nro_factura: factura.nro_factura }, { $set: factura }, { upsert: true });
    }
  } finally {
    clienteSql.release();
  }
}


module.exports = { pool, mongoDB };