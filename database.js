console.log('si');
const mysql2 = require('mysql2');
const dotenv = require('dotenv');

// Configura DotEnv
dotenv.config();

// Crear pool de conexiones a la base de datos MySQL
const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "convertidor",
    port: "3306",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Obtener una conexión del pool
function obtenerConexion() {
    return pool.promise().getConnection();
}

// Función para verificar la conexión a la base de datos
async function verificarConexion() {
    try {
        // Obtener una conexión del pool
        const connection = await obtenerConexion();
        connection.release(); // Liberar la conexión

        console.log('Conexión establecida a la base de datos');
        return true;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        return false;
    }
}

// Función para ejecutar consultas en la base de datos
async function queryDatabase(sql, params) {
    try {
        // Obtener una conexión del pool
        const connection = await obtenerConexion();
        
        // Ejecutar la consulta SQL con los parámetros proporcionados
        const [rows, fields] = await connection.execute(sql, params);
        
        // Liberar la conexión
        connection.release();
        
        // Retornar los resultados de la consulta
        return rows;
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error.message);
        throw error;
    }
}

module.exports = {
    obtenerConexion,
    verificarConexion,
    queryDatabase
};

console.log('Comprobando la conexión a la base de datos...');

// Llamar a la función verificarConexion
verificarConexion().then((conexionExitosa) => {
    if (conexionExitosa) {
        console.log('La conexión a la base de datos fue exitosa');
    } else {
        console.log('No se pudo establecer la conexión a la base de datos');
    }
}).catch((error) => {
    console.error('Error al verificar la conexión a la base de datos:', error);
});
