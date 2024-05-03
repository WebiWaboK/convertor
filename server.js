const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.set('view engine', 'pug'); // Establece el motor de plantillas Pug

app.get('/', (req, res) => {
    res.render('index'); // Renderiza la plantilla 'index.pug'
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
    console.log('Para entrar, visita: http://localhost:3000/');
});
