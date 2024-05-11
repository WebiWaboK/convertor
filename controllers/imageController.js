const fs = require('fs');
const sharp = require('sharp');

// Función para convertir la imagen a otro formato
function convertImage(inputPath, outputPath, outputFormat, callback) {
  // Usamos Sharp para realizar la conversión de la imagen
  sharp(inputPath)
    .toFormat(outputFormat)
    .toFile(outputPath, (err, info) => {
      if (err) {
        callback(err);
      } else {
        callback(null, outputPath);
      }
    });
}

module.exports = {
  convertImage
};
