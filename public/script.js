document.getElementById("generate").addEventListener("click", generateMatrices);
document.getElementById("calculate").addEventListener("click", multiplyMatrices);

function generateMatrices() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    if (rows <= 0 || cols <= 0) {
        alert("Ingresa valores válidos para filas y columnas.");
        return;
    }

    createMatrix("matrix1", rows, cols);
    createMatrix("matrix2", cols, rows); // Para asegurar la multiplicación compatible
}

function createMatrix(containerId, rows, cols) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        row.style.display = "flex";
        for (let j = 0; j < cols; j++) {
            let input = document.createElement("input");
            input.type = "number";
            input.style.width = "50px";
            row.appendChild(input);
        }
        container.appendChild(row);
    }
}

function multiplyMatrices() {
    const matrix1 = getMatrixValues("matrix1");
    const matrix2 = getMatrixValues("matrix2");

    if (!matrix1 || !matrix2) {
        alert("Completa todas las casillas con números.");
        return;
    }

    fetch("http://localhost:3000/multiply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix1, matrix2 })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            displayResult(data.result);
        }
    })
    .catch(error => console.error("Error:", error));
}

function getMatrixValues(containerId) {
    const container = document.getElementById(containerId);
    const rows = container.children;
    let matrix = [];

    for (let i = 0; i < rows.length; i++) {
        let row = [];
        const inputs = rows[i].children;
        for (let j = 0; j < inputs.length; j++) {
            let value = parseFloat(inputs[j].value);
            if (isNaN(value)) return null;
            row.push(value);
        }
        matrix.push(row);
    }
    return matrix;
}

function displayResult(result) {
    const container = document.getElementById("result");
    container.innerHTML = "";
    result.forEach(row => {
        let rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        row.forEach(value => {
            let cell = document.createElement("div");
            cell.textContent = value;
            cell.className = "result-box";
            rowDiv.appendChild(cell);
        });
        container.appendChild(rowDiv);
    });
}
