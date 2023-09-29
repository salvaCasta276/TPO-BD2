require('dotenv').config();
const express = require('express');
const pool = require('./database');
const app = express();
const port = 3000;

app.use(express.json()); // Para poder manejar JSON en el body

// Swagger
// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./swagger.yaml');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas para manejar clientes
app.get('/clientes', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM E01_CLIENTE');
      const results = { 'results': (result) ? result.rows : null};
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

app.post('/clientes', async (req, res) => {
    const { nombre, apellido, direccion, activo } = req.body;
  
    try {
      const result = await pool.query(
        `INSERT INTO E01_CLIENTE (nombre, apellido, direccion, activo) VALUES ($1, $2, $3, $4) RETURNING nro_cliente`,
        [nombre, apellido, direccion, activo]
      );
      res.status(201).json({ id: result.rows[0].nro_cliente });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear nuevo cliente' });
    }
  });
  

app.put('/clientes/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, direccion, activo } = req.body;
  
    try {
      await pool.query(
        `UPDATE E01_CLIENTE SET nombre = $1, apellido = $2, direccion = $3, activo = $4 WHERE nro_cliente = $5`,
        [nombre, apellido, direccion, activo, id]
      );
      res.status(200).json({ message: 'Cliente actualizado exitosamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  });
  

app.delete('/clientes/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      await pool.query(`DELETE FROM E01_CLIENTE WHERE nro_cliente = $1`, [id]);
      res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar cliente' });
    }
  });
  

// Rutas para manejar productos
app.post('/productos', async (req, res) => {
    const { marca, nombre, descripcion, precio, stock } = req.body;
  
    try {
      const result = await pool.query(
        `INSERT INTO E01_PRODUCTO (marca, nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING codigo_producto`,
        [marca, nombre, descripcion, precio, stock]
      );
      res.status(201).json({ id: result.rows[0].codigo_producto });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear nuevo producto' });
    }
  });
  

app.put('/productos/:id', async (req, res) => {
    const id = req.params.id;
    const { marca, nombre, descripcion, precio, stock } = req.body;
  
    try {
      await pool.query(
        `UPDATE E01_PRODUCTO SET marca = $1, nombre = $2, descripcion = $3, precio = $4, stock = $5 WHERE codigo_producto = $6`,
        [marca, nombre, descripcion, precio, stock, id]
      );
      res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  });
  

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
