const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://usuario:contraseña@localhost:3306/converter');

// Intenta autenticar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida con éxito :D');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });
