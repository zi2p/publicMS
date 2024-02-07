document.addEventListener('DOMContentLoaded', (event) => {
    const chartInstances = {};
    const toggleThemeButton = document.getElementById('toggleThemeButton');
    const showExamplesButton = document.getElementById('showExamplesButton');
    const exampleList = document.getElementById('exampleList');
    const modal = document.getElementById("loadingModal");
    const span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }

    function showLoadingModal() {
        modal.style.display = "block";
    }

    function hideLoadingModal() {
        modal.style.display = "none";
    }

    function clearCanvas(canvasId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (chartInstances[canvasId]) {
            chartInstances[canvasId].destroy();
            chartInstances[canvasId] = null;
        }
    }

    function drawGraph(canvasId, label, xValues, yValues, color, xLabel, yLabel) {
        clearCanvas(canvasId);
        const ctx = document.getElementById(canvasId).getContext('2d');
        chartInstances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    label: label,
                    data: yValues,
                    borderColor: color,
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: xLabel
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: yLabel
                        }
                    }
                }
            }
        });
    }


    function calculateValues(userFunction, derivativeOrder = 0) {
        let values = [];
        let functionToEvaluate = userFunction;

        if (derivativeOrder > 0) {
            for (let i = 0; i < derivativeOrder; i++) {
                functionToEvaluate = math.derivative(functionToEvaluate, 't').toString();
            }
        }

        for (let t = 0; t <= 10; t += 0.1) {
            let evaluatedFunction = functionToEvaluate.replace(/t/g, `(${t})`);

            evaluatedFunction = evaluatedFunction.replace(/log\((.*?), (.*?)\)/g, (match, number, base) =>
                `math.log(${number}, ${base})`
            );
            console.log(evaluatedFunction);
            if (derivativeOrder === -1 || derivativeOrder === -2) {
                let integral = nerdamer.integrate(userFunction).text();
                let integralValue = nerdamer(integral, { x: t }).evaluate().text();
                console.log(integralValue);
                values.push(parseFloat(integralValue));
            } else {
                let value = math.evaluate(evaluatedFunction);
                values.push(parseFloat(value));
            }
        }
        return values;
    }

    function determineAndDrawGraphs() {
        let userInput = document.getElementById('functionInput').value;
        let functionType = userInput.match(/(x|v|a)\(t\)/);

        if (functionType) {
            let userFunction = userInput.match(/=(.*)/)[1].trim();
            let xValues = Array.from({length: 101}, (_, i) => (0.1 * i).toFixed(2));

            switch (functionType[1]) {
                case 'x':
                    drawGraph('mainGraph', 'Координата от времени', xValues, calculateValues(userFunction), 'blue', 'Время (с)', 'Координата (м)');
                    drawGraph('sideGraph1', 'Скорость от времени', xValues, calculateValues(userFunction, 1), 'red', 'Время (с)', 'Скорость (м/с)');
                    drawGraph('sideGraph2', 'Ускорение от времени', xValues, calculateValues(userFunction, 2), 'green', 'Время (с)', 'Ускорение (м/с²)');
                    break;
                case 'v':
                    drawGraph('mainGraph', 'Скорость от времени', xValues, calculateValues(userFunction), 'red', 'Время (с)', 'Скорость (м/с)');
                    drawGraph('sideGraph1', 'Координата от времени', xValues, calculateValues(userFunction, -1), 'blue', 'Время (с)', 'Координата (м)');
                    drawGraph('sideGraph2', 'Ускорение от времени', xValues, calculateValues(userFunction, 1), 'green', 'Время (с)', 'Ускорение (м/с²)');
                    break;
                case 'a':
                    drawGraph('mainGraph', 'Ускорение от времени', xValues, calculateValues(userFunction), 'green', 'Время (с)', 'Ускорение (м/с²)');
                    drawGraph('sideGraph1', 'Скорость от времени', xValues, calculateValues(userFunction, -1), 'red', 'Время (с)', 'Скорость (м/с)');
                    drawGraph('sideGraph2', 'Координата от времени', xValues, calculateValues(userFunction, -2), 'blue', 'Время (с)', 'Координата (м)');
                    break;
                default:
                    alert('Введите корректную функцию (x(t), v(t) или a(t))');
            }
        } else {
            alert('Введите корректную функцию (x(t), v(t) или a(t))');
        }
    }

    document.getElementById('drawGraphsButton').addEventListener('click', function() {
        showLoadingModal();

        setTimeout(function() {
            determineAndDrawGraphs();
            hideLoadingModal();
        }, 50);
    });



    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('night-theme');
    });

    showExamplesButton.addEventListener('click', () => {
        exampleList.style.display = exampleList.style.display === 'none' ? 'block' : 'none';
    });
});
