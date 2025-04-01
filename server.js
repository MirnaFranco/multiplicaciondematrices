import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json()); // Habilita el uso de JSON en las solicitudes
app.use(cors()); // Habilita CORS para permitir solicitudes desde el frontend

// Función para multiplicar dos matrices
function multiplyMatrices(matrix1, matrix2) {
    const rowsA = matrix1.length, colsA = matrix1[0].length;
    const rowsB = matrix2.length, colsB = matrix2[0].length;

    // Verifica si las dimensiones son compatibles para la multiplicación
    if (colsA !== rowsB) {
        return null;
    }

    // Inicializa la matriz de resultado con ceros
    let result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

    // Realiza la multiplicación de matrices
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

// Ruta para manejar la multiplicación de matrices
app.post('/multiply', (req, res) => {
    const { matrix1, matrix2 } = req.body;
    const result = multiplyMatrices(matrix1, matrix2);
    
    // Verifica si la multiplicación es posible
    if (!result) {
        return res.status(400).json({ error: "Dimensiones incompatibles" });
    }
    
    res.json({ result }); // Envía la matriz resultante como respuesta
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Asegúrate de tener tu HTML en la carpeta 'public'
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => console.log('Servidor en ejecución en http://localhost:3000'));
