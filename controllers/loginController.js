const express = require('express');
const router = express.Router();
const { queryDatabase } = require('../database.js');

// Ruta POST para manejar la lógica de inicio de sesión
router.post('/login', (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { usuario, contraseña_hash, correo } = req.body;

    // Construir la consulta SQL para insertar los datos del usuario en la base de datos
    const sql = 'INSERT INTO usuarios (usuario, contraseña_hash, correo) VALUES (?, ?, ?)';
    const params = [usuario, contraseña_hash, correo];

    // Ejecutar la consulta en la base de datos
    queryDatabase(sql, params, (error, results) => {
        if (error) {
            // Si hay un error al insertar los datos, enviar una respuesta de error
            console.error('Error al realizar la inserción en la base de datos:', error);
            res.status(500).send('Error al registrar usuario. Inténtelo de nuevo más tarde.');
        } else {
            // Si la inserción es exitosa, enviar una respuesta de éxito
            console.log('Usuario registrado exitosamente:', results);
            res.status(200).send('¡Usuario registrado exitosamente!');
            res.redirect('/'); // Redirigir después de enviar la respuesta
        }
    });
});

module.exports = router;
