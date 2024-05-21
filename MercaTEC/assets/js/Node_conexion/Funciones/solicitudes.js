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

router.get('/getTransaccionesProductosPorComprador', async (req, res) => {
    const pool = await getConnection();
    try {
        // Obtener el idComprador de la consulta
        const idComprador = req.query.idComprador;

        // Verificar si el idComprador se ha proporcionado
        if (!idComprador) {
            return res.status(400).send('El idComprador es necesario para la consulta');
        }

        // Ejecutar el procedimiento almacenado pasando el idComprador como parámetro
        const result = await pool.request()
                                  .input('idComprador', sql.Int, idComprador)
                                  .execute('getTransaccionesProductosPorComprador');

        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la ejecución del procedimiento almacenado');
    }
});

router.get('/getTransaccionesProductosPorVendedor', async (req, res) => {
    const pool = await getConnection();
    try {
        // Obtener el idVendedor de la consulta
        const idVendedor = req.query.idVendedor;

        // Verificar si el idVendedor se ha proporcionado
        if (!idVendedor) {
            return res.status(400).send('El idVendedor es necesario para la consulta');
        }

        // Ejecutar el procedimiento almacenado pasando el idVendedor como parámetro
        const result = await pool.request()
                                  .input('idVendedor', sql.Int, idVendedor)
                                  .execute('getTransaccionesProductosPorVendedor');

        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la ejecución del procedimiento almacenado');
    }
});


router.get('/getTransaccionesServiciosPorComprador', async (req, res) => {
    const pool = await getConnection();
    try {
        // Obtener el idComprador de la consulta
        const idComprador = req.query.idComprador;

        // Verificar si el idComprador se ha proporcionado
        if (!idComprador) {
            return res.status(400).send('El idComprador es necesario para la consulta');
        }

        // Ejecutar el procedimiento almacenado pasando el idComprador como parámetro
        const result = await pool.request()
                                  .input('idComprador', sql.Int, idComprador)
                                  .execute('getTransaccionesServiciosPorComprador');

        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la ejecución del procedimiento almacenado');
    }
});

router.get('/getTransaccionesServiciosPorVendedor', async (req, res) => {
    const pool = await getConnection();
    try {
        // Obtener el idVendedor de la consulta
        const idVendedor = req.query.idVendedor;

        // Verificar si el idVendedor se ha proporcionado
        if (!idVendedor) {
            return res.status(400).send('El idVendedor es necesario para la consulta');
        }

        // Ejecutar el procedimiento almacenado pasando el idVendedor como parámetro
        const result = await pool.request()
                                  .input('idVendedor', sql.Int, idVendedor)
                                  .execute('getTransaccionesServiciosPorVendedor');

        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la ejecución del procedimiento almacenado');
    }
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

router.get('/getProducto/:idProducto', async (req, res) => {
    const { idProducto } = req.params;
    const pool = await getConnection();
    
    try {
        const result = await pool.request()
            .input('idProducto', sql.Int, idProducto) // Asegúrate de que el tipo de dato corresponda al tipo en tu base de datos
            .query('SELECT cantidad FROM dbo.Productos WHERE idProducto = @idProducto');
            res.json(result.recordset);

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

router.post('/insertarTransaccion', async (req, res) => {
    const { idComprador, idVendedor, idProducto } = req.body;

    // Validar que los datos necesarios están presentes
    if (!idComprador || !idVendedor || !idProducto) {
        return res.status(400).json({ error: "Los campos idComprador, idVendedor y idProducto son obligatorios" });
    }

    try {
        const pool = await getConnection();
        const query = `
            INSERT INTO dbo.TransaccionesProductos (idComprador, idVendedor, idProducto, fechaCompra)
            VALUES (@idComprador, @idVendedor, @idProducto, GETDATE())
        `;
        const result = await pool.request()
            .input('idComprador', sql.Int, idComprador)
            .input('idVendedor', sql.Int, idVendedor)
            .input('idProducto', sql.Int, idProducto)
            .query(query);

        res.json({ mensaje: "Transacción insertada correctamente con la fecha actual del sistema", resultado: result.recordset });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/setProducto', async (req, res) => {
    const { idUsuario, idCategoria, nombre, cantidad, precio, descripcion } = req.body;
    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('idUsuario', sql.Int, idUsuario)
            .input('idCategoria', sql.Int, idCategoria)
            .input('nombre', sql.VarChar, nombre)
            .input('cantidad', sql.Int, cantidad)
            .input('precio', sql.Int, precio)
            .input('descripcion', sql.VarChar, descripcion)
            .query('INSERT INTO dbo.Productos (idUsuario, idCategoria, nombre, cantidad, precio, descripcion) VALUES (@idUsuario, @idCategoria, @nombre, @cantidad, @precio, @descripcion)');
        
        res.status(201).send('Producto registrado correctamente.');
    } catch (error) {
        console.error('Error al registrar el producto:', error);
        res.status(500).send('Error al registrar el producto');
    }
});

router.post('/setServicio', async (req, res) => {
    const { idUsuario, idCategoria, nombre, cantidad, precio, descripcion } = req.body;
    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('idUsuario', sql.Int, idUsuario)
            .input('idCategoria', sql.Int, idCategoria)
            .input('nombre', sql.VarChar, nombre)
            .input('cantidad', sql.Int, cantidad)
            .input('precio', sql.Int, precio)
            .input('descripcion', sql.VarChar, descripcion)
            .query('INSERT INTO dbo.Servicios (idUsuario, idCategoria, nombre, cantidad, precio, descripcion) VALUES (@idUsuario, @idCategoria, @nombre, @cantidad, @precio, @descripcion)');
        res.status(201).send('Servicio registrado correctamente.');
    } catch (error) { 
        console.error('Error al registrar el servicio:', error);
        res.status(500).send('Error al registrar el servicio');
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

//--------------------------PUTS(UPDATE)--------------------------
router.put('/updateUsuario/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const { nombre, apellidos, numero, biografia, contrasenna} = req.body; // Asumimos que la biografía se puede actualizar aunque no estaba en el original.
    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idUsuario', sql.Int, idUsuario)
            .input('nombre', sql.VarChar, nombre)
            .input('apellidos', sql.VarChar, apellidos)
            .input('numero', sql.Int, numero)
            .input('biografia', sql.VarChar, biografia) // Asumiendo que 'biografia' es un campo existente en la base de datos.
            .input('contrasenna', sql.VarChar, contrasenna)
            .query('UPDATE dbo.Usuarios SET nombre = @nombre, apellidos = @apellidos, numero = @numero, biografia = @biografia, contrasenna = @contrasenna WHERE idUsuario = @idUsuario');

        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Usuario actualizado correctamente.');
        } else {
            res.status(404).send('Usuario no encontrado.');
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send('Error al actualizar el usuario');
    }
});
router.put('/updateProducto/:idProducto', async (req, res) => {
    const { idProducto } = req.params;
    const { idCategoria, nombre, cantidad, precio, descripcion } = req.body;
    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idProducto', sql.Int, idProducto)
            .input('idCategoria', sql.Int, idCategoria)
            .input('nombre', sql.VarChar, nombre)
            .input('cantidad', sql.Int, cantidad)
            .input('precio', sql.Int, precio)
            .input('descripcion', sql.VarChar, descripcion)
            .query('UPDATE dbo.Productos SET idCategoria = @idCategoria, nombre = @nombre, cantidad = @cantidad, precio = @precio, descripcion = @descripcion WHERE idProducto = @idProducto');

        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Producto actualizado correctamente.');
        } else {
            res.status(404).send('Producto no encontrado.');
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send('Error al actualizar el producto');
    }
});

router.put('/updateServicio/:idServicio', async (req, res) => {
    const { idServicio } = req.params;
    const { idCategoria, nombre, cantidad, precio, descripcion } = req.body;
    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idServicio', sql.Int, idServicio)
            .input('idCategoria', sql.Int, idCategoria)
            .input('nombre', sql.VarChar, nombre)
            .input('cantidad', sql.Int, cantidad)
            .input('precio', sql.Int, precio)
            .input('descripcion', sql.VarChar, descripcion)
            .query('UPDATE dbo.Servicios SET idCategoria = @idCategoria, nombre = @nombre, cantidad = @cantidad, precio = @precio, descripcion = @descripcion WHERE idServicio = @idServicio');

        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Servicio actualizado correctamente.');
        } else {
            res.status(404).send('Servicio no encontrado.');
        }
    } catch (error) {
        console.error('Error al actualizar el servicio:', error);
        res.status(500).send('Error al actualizar el servicio');
    }
});

module.exports = router;