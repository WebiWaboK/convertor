const express = require('express');
const router = express.Router();
const { queryDatabase } = require('./database.js');

router.post('login', (req, res) => {
    const { usuario, contraseña_hash, correo } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña_hash = ? AND correo = ?';
    const params = [usuario, contraseña_hash, correo];

    queryDatabase(sql, params, (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(500).send('Error al iniciar sesión. Inténtelo de nuevo más tarde.');
        } else {
            if (results.length > 0) {
                // Usuario autenticado, redirigir o enviar una respuesta de éxito
                res.status(200).send('¡Inicio de sesión exitoso!');
            } else {
                // Usuario no encontrado en la base de datos, enviar un mensaje de error
                res.status(401).send('Nombre de usuario, contraseña o correo electrónico incorrectos.');
            }
        }
    });
});

module.exports = router;