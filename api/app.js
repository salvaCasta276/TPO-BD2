require('dotenv').config();
const express = require('express');
const { pool } = require('./database');
const app = express();
const port = 3000;

app.use(express.json()); // Para poder manejar JSON en el body

// API
// 1.1 Dar de alta a nuevos clientes
// 1.2, baja
// 1.3 y modificación de los ya existentes.
// 2.1 Dar de alta a nuevos productos
// 2.2 y modificación de los ya existentes. Tenga en cuenta que el 
// precio de un producto es sin IVA
// 5 APIs totales


// SQL! --- SQL -- SQL --- SQL --->

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

app.get('/clientes/:id', async (req, res) => {
const { id } = req.params;
try {
    const result = await pool.query('SELECT * FROM E01_CLIENTE WHERE nro_cliente = $1', [id]);
    if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
    } else {
    res.status(404).json({ error: 'Cliente no encontrado' });
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al recuperar cliente' });
}
});

app.post('/clientes', async (req, res) => {
    const {nro_cliente, nombre, apellido, direccion, activo } = req.body;
    console.log(req.body);
    try {
      const result = await pool.query(
        `INSERT INTO E01_CLIENTE (nro_cliente, nombre, apellido, direccion, activo) VALUES ($1, $2, $3, $4, $5) RETURNING nro_cliente`,
        [nro_cliente, nombre, apellido, direccion, activo]
      );
      res.status(201).json({
        id: result.rows[0].nro_cliente,
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        activo: activo
       });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear nuevo cliente' });
    }
  });
  

app.put('/clientes/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, direccion, activo } = req.body;
  
    try {
        const result = await pool.query(
            `UPDATE E01_CLIENTE SET nombre = $1, apellido = $2, direccion = $3, activo = $4 WHERE nro_cliente = $5 RETURNING nro_cliente`,
            [nombre, apellido, direccion, activo, id]
          );
          
          if (result.rows.length > 0) {
            res.status(200).json({
              id: result.rows[0].nro_cliente,
              nombre: nombre,
              apellido: apellido,
              direccion: direccion,
              activo: activo
            });
          } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
          }          
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  });
  

app.delete('/clientes/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
        const result = await pool.query(`DELETE FROM E01_CLIENTE WHERE nro_cliente = $1 RETURNING nro_cliente`, [id]);

        if (result.rows.length > 0) {
          res.status(200).json({ message: 'Cliente eliminado exitosamente' });
        } else {
          res.status(404).json({ error: 'Cliente no encontrado' });
        }        
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar cliente' });
    }
  });
  

// Rutas para manejar productos
app.get('/productos', async(req,res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM E01_PRODUCTO');
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.post('/productos', async (req, res) => {
    const { codigo_producto, marca, nombre, descripcion, precio, stock } = req.body;
  
    try {
      const result = await pool.query(
        `INSERT INTO E01_PRODUCTO VALUES ($1, $2, $3, $4, $5, $6) RETURNING codigo_producto`,
        [codigo_producto, marca, nombre, descripcion, precio, stock]
      );
      res.status(201).json({
        id: result.rows[0].codigo_producto,
        marca: marca,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio, 
        stock: stock, 
       });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear nuevo producto' });
    }
});

app.get('/productos/:id', async (req, res) => {
const { id } = req.params;
try {
    const result = await pool.query('SELECT * FROM E01_PRODUCTO WHERE codigo_producto = $1', [id]);
    if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
    } else {
    res.status(404).json({ error: 'Producto no encontrado' });
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al recuperar producto' });
}
});
  

app.put('/productos/:id', async (req, res) => {
    const id = req.params.id;
    const { marca, nombre, descripcion, precio, stock } = req.body;
  
    try {
        const result = await pool.query(
            `UPDATE E01_PRODUCTO SET marca = $1, nombre = $2, descripcion = $3, precio = $4, stock = $5 WHERE codigo_producto = $6 RETURNING codigo_producto`,
            [marca, nombre, descripcion, precio, stock, id]
          );
          
          if (result.rows.length > 0) {
            res.status(200).json({
              id: result.rows[0].codigo_producto,
              marca: marca,
              nombre: nombre,
              descripcion: descripcion,
              precio: precio, 
              stock: stock, 
            });
          } else {
            res.status(404).json({ error: 'Producto no encontrado' });
          }          
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  });

app.delete('/productos/:id', async (req, res) => {
const { id } = req.params;
try {
    const result = await pool.query('DELETE FROM E01_PRODUCTO WHERE codigo_producto = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
    res.status(200).json({ message: 'Producto eliminado con éxito' });
    } else {
    res.status(404).json({ error: 'Producto no encontrado' });
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar producto' });
}
});
  

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});






module.exports = app;
