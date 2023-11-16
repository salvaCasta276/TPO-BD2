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


// 'mongodb://'+process.env.MONGO_HOST+':'+process.env.MONGO_PORT;
const mongoUrl = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(mongoUrl);

let mongoDB = mongoClient;



async function prueba(){
  console.log('prueba de client');
  const client = new MongoClient('mongodb://localhost:27017', { monitorCommands: true });
  await client.connect();
  client.on('commandStarted', started => console.log(started));
  const db = client.db('bd2'); // Referencia a la base de datos
  await db.createCollection('pets');
  await client.db('bd2').collection('pets').insertOne({ name: 'spot', kind: 'dog' });
  console.log('prueba de client terminada');
}

prueba();

// mongoClient.connect((err, client) => {
//   if (err) throw err;
//   mongoDB = client.db('bd2');
//   console.log('Conectado a MongoDB');
// });



module.exports = { pool, mongoDB };