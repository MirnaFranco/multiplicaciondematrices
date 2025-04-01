from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def multiply_matrices(matrix1, matrix2):
    rows_a, cols_a = len(matrix1), len(matrix1[0])
    rows_b, cols_b = len(matrix2), len(matrix2[0])
    
    if cols_a != rows_b:
        return None
    
    result = [[0] * cols_b for _ in range(rows_a)]
    
    for i in range(rows_a):
        for j in range(cols_b):
            for k in range(cols_a):
                result[i][j] += matrix1[i][k] * matrix2[k][j]
    
    return result

@app.route('/multiply', methods=['POST'])
def multiply():
    data = request.get_json()
    matrix1 = data.get('matrix1')
    matrix2 = data.get('matrix2')
    
    result = multiply_matrices(matrix1, matrix2)
    if result is None:
        return jsonify({"error": "Dimensiones incompatibles"}), 400
    
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
