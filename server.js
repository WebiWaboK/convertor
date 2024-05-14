//server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const converterController = require('./controllers/converterController');
const sharp = require('sharp');

const app = express();
const port = 3000;

// Configurar Multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

// Configurar middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

// Ruta principal para renderizar el formulario de conversión de imágenes
app.get('/', (req, res) => {
  res.render('index', { inputImage: req.file ? req.file.originalname : null });
});

app.get('/historial', (req, res) => {
  res.render('historial');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// Ruta para manejar la solicitud POST de conversión de imágenes
app.post('/convert', upload.single('inputImage'), converterController.convertImage);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000 http://localhost:3000/');
});
