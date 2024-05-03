const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('./database');

router.get('/datos', async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Persona');
    res.json(result.recordset);
});

router.post('/registrar', async (req, res) => {
    const { nombre, apellidos, numero, contrasenna } = req.body;
    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('apellidos', sql.VarChar, apellidos)
            .input('contrasenna', sql.VarChar, contrasenna)
            .input('numero', sql.Int, numero)
            .query('INSERT INTO dbo.Persona (nombre, apellidos, contrasenna, numero) VALUES (@nombre, @apellidos, @contrasenna, @numero)');
        
        res.status(201).send('Usuario registrado correctamente.');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
});


//--------------------------GETS--------------------------
router.get('/getUsuarios', async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT idUsuario, nombre, apellidos, correo, numero, biografia, fechaDeRegistro, contrasenna, imgURL FROM dbo.Usuarios');
    res.json(result.recordset);
});

router.get('/getProductos', async (req, res) => {
    const pool = await getConnection();
    try {
        const result = await pool.request().execute('getProductos');  // Cambio aquí para usar execute y el nombre del procedimiento almacenado
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la ejecución del procedimiento almacenado');
    }
});

router.get('/getServicios', async (req, res) => {
    const pool = await getConnection();
    try {
        const result = await pool.request().execute('getServicios');  // Cambio aquí para usar execute y el nombre del procedimiento almacenado
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la ejecución del procedimiento almacenado');
    }
});


//--------------------------POSTS--------------------------
router.post('/setUsuario', async (req, res) => {
    const { nombre, apellidos, correo, numero, contrasenna } = req.body;
    const pool = await getConnection();
    try {
        const fechaActual = new Date();
        const result = await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('apellidos', sql.VarChar, apellidos)
            .input('correo', sql.VarChar, correo)
            .input('numero', sql.Int, numero)
            .input('contrasenna', sql.VarChar, contrasenna)
            .input('fechaDeRegistro', sql.Date, fechaActual)
            .query('INSERT INTO dbo.Usuarios (nombre, apellidos, correo, numero, contrasenna, fechaDeRegistro) VALUES (@nombre, @apellidos, @correo, @numero, @contrasenna, @fechaDeRegistro)');
        
        res.status(201).send('Usuario registrado correctamente.');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
});


//--------------------------DELETES--------------------------
router.delete('/deleteProducto/:idProducto', async (req, res) => {
    const { idProducto } = req.params; // Obtiene el idProducto desde el parámetro URL
    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idProducto', sql.Int, idProducto) // Asegúrate de que el tipo de dato corresponda al tipo en tu base de datos
            .query('DELETE FROM dbo.Productos WHERE idProducto = @idProducto');

        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Producto eliminado correctamente.');
        } else {
            res.status(404).send('Producto no encontrado.');
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error al eliminar el producto');
    }
});


router.delete('/deleteServicio/:idServicio', async (req, res) => {
    const { idServicio } = req.params; // Obtiene el idServicio desde el parámetro URL
    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idServicio', sql.Int, idServicio) // Asegúrate de que el tipo de dato corresponda al tipo en tu base de datos
            .query('DELETE FROM dbo.Servicios WHERE idServicio = @idServicio');

        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Servicio eliminado correctamente.');
        } else {
            res.status(404).send('Servicio no encontrado.');
        }
    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        res.status(500).send('Error al eliminar el servicio');
    }
});


module.exports = router;