import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Convertir __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// Multiplicación
function multiplyMatrices(matrix1, matrix2) {
    const rowsA = matrix1.length, colsA = matrix1[0].length;
    const rowsB = matrix2.length, colsB = matrix2[0].length;

    if (colsA !== rowsB) return null;

    const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}

app.post('/multiply', (req, res) => {
    const { matrix1, matrix2 } = req.body;
    const result = multiplyMatrices(matrix1, matrix2);
    if (!result) return res.status(400).json({ error: "Dimensiones incompatibles" });
    res.json({ result });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
