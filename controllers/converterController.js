const sharp = require('sharp');
const path = require('path');

// Controlador para manejar la conversión de imágenes
function convertImage(req, res) {
  const inputPath = req.file.path;
  const outputFormat = req.body.outputFormat || 'jpeg'; // Formato de salida predeterminado es JPEG
  const outputFileName = `${path.parse(req.file.originalname).name}.${outputFormat}`; // Nombre del archivo de salida
  const outputPath = `public/${outputFileName}`; // Ruta de salida de la imagen

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
        res.download(outputPath, outputFileName, (downloadErr) => {
          if (downloadErr) {
            console.error('Error al descargar la imagen:', downloadErr);
            // Si hay un error en la descarga, enviar una respuesta al cliente
            res.status(500).send('Error al descargar la imagen.');
          } else {
            // Renderizar la vista después de enviar el archivo para descargar
            res.render('historial', { convertedFileName: outputFileName });
          }
        });
      }
    });
}

module.exports = {
  convertImage
};
