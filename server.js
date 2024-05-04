const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
    console.log('Para entrar, visita: http://localhost:3000/');
});
