const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/inicio', (req,res) => {
    res.render('inicio');
})

// Importar el controlador de inicio de sesión
const loginController = require('./controllers/loginController');

// Utilizar el controlador para manejar la lógica de inicio de sesión en la ruta POST /login
app.post('/login', loginController);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000 http://localhost:3000/');
});