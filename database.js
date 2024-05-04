
const mysql2 = require('mysql2');

// Crea un pool de conexiones
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'converter',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exporta el pool de conexiones para que pueda ser utilizado en otros archivos
module.exports = pool.promise(); // Utiliza el método `promise()` para trabajar con promesas

// Intenta conectarte a la base de datos utilizando el pool de conexiones
(async () => {
    try {
        const connection = await pool.getConnection();
        connection.release(); // Libera la conexión para que pueda ser utilizada por otros
        console.log('Conexión establecida :D a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
})();
