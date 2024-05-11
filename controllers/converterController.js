const fs = require('fs');
const sharp = require('sharp');

// Controlador para manejar la conversión de imágenes
function convertImage(req, res) {
  const inputPath = req.file.path;
  const outputFormat = req.body.outputFormat || 'jpeg'; // Formato de salida predeterminado es JPEG
  const outputPath = 'public/output.jpg'; // Ruta de salida de la imagen

  // Utilizamos Sharp para realizar la conversión de la imagen
  sharp(inputPath)
    .toFormat(outputFormat)
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.error('Error al convertir la imagen:', err);
        res.status(500).send('Error al convertir la imagen.');
      } else {
        console.log('Imagen convertida con éxito:', info);
        // Enviar el archivo de imagen convertida para descargar
        res.download(outputPath);
      }
    });
}

module.exports = {
  convertImage
};
