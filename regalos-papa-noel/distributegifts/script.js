function distributeGifts(input) {
    const rows = input.length;
    const cols = input[0].length;
    const output = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Función auxiliar para obtener el valor de una celda si es válida
    function getValue(i, j) {
        if (i >= 0 && i < rows && j >= 0 && j < cols && input[i][j] !== null) {
        return input[i][j];
        }
        return null;
    }

    // Recorrer la matriz y calcular el promedio para cada posición
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
        const neighbors = [
          getValue(i - 1, j), // arriba
          getValue(i + 1, j), // abajo
          getValue(i, j - 1), // izquierda
          getValue(i, j + 1), // derecha
          input[i][j],        // valor actual
        ].filter((val) => val !== null); // Ignorar valores nulos

        const sum = neighbors.reduce((acc, val) => acc + val, 0);
        const average = Math.round(sum / neighbors.length);

        output[i][j] = averag
        }
    }

    return output
}

    const result = distributeGifts([
    [4, 5, 1],
    [6, null, 3],
    [8, null, 4],
    ])



function showResult() {
    const result = distributeGifts([
        [4, 5, 1],
        [6, null, 3],
        [8, null, 4],
    ]);

    let formattedResult = ""
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            formattedResult += result[i][j] + " "
        }
        formattedResult += "<br>"
    }

    document.getElementById('result').innerHTML = formattedResult
}
