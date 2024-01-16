document.addEventListener("DOMContentLoaded", function () {
    let timeSlider = document.getElementById("timeRange");
    let timeOutput = document.getElementById("timeValue");

    let positionSlider = document.getElementById("positionRange");
    let positionOutput = document.getElementById("positionValue");

    let velocitySlider = document.getElementById("velocityRange");
    let velocityOutput = document.getElementById("velocityValue");

    let accelerationSlider = document.getElementById("accelerationRange");
    let accelerationOutput = document.getElementById("accelerationValue");

    function updateValues() {
        timeOutput.innerHTML = timeSlider.value;
        positionOutput.innerHTML = positionSlider.value;
        velocityOutput.innerHTML = velocitySlider.value;
        accelerationOutput.innerHTML = accelerationSlider.value;

        localStorage.setItem('time', timeSlider.value);
        localStorage.setItem('position', positionSlider.value);
        localStorage.setItem('velocity', velocitySlider.value);
        localStorage.setItem('acceleration', accelerationSlider.value);

        updatePlot();
    }

    function setupInitialValues() {
        timeSlider.value = localStorage.getItem('time') || 0;
        positionSlider.value = localStorage.getItem('position') || 0;
        velocitySlider.value = localStorage.getItem('velocity') || 0;
        accelerationSlider.value = localStorage.getItem('acceleration') || 0;

        updateValues();
    }

    timeSlider.addEventListener("input", updateValues);
    positionSlider.addEventListener("input", updateValues);
    velocitySlider.addEventListener("input", updateValues);
    accelerationSlider.addEventListener("input", updateValues);

    function updatePlot() {
        let t = parseInt(timeSlider.value);
        let x0 = parseInt(positionSlider.value);
        let v0 = parseInt(velocitySlider.value);
        let a = parseInt(accelerationSlider.value);

        let time = Array.from({ length: t + 1 }, (_, i) => i);
        let coords = time.map((ti) => x0 + v0 * ti + 0.5 * a * ti ** 2);
        let velos = time.map((ti) => v0 + a * ti);
        let accels = new Array(t + 1).fill(a);

        let trace1 = {
            x: time,
            y: coords,
            type: 'scatter',
            name: 'Координата x материальной точки'
        };

        let trace2 = {
            x: time,
            y: velos,
            type: 'scatter',
            name: 'Скорость v_x материальной точки'
        };

        let trace3 = {
            x: time,
            y: accels,
            type: 'scatter',
            name: 'Ускорение a_x материальной точки'
        };

        let layout = {
            title: 'Кинематика материальной точки, движущейся с постоянным ускорением a_0',
            xaxis: {
                title: 'Время, с'
            },
            yaxis: {
                title: 'Значение'
            }
        };

        Plotly.newPlot('plot', [trace1, trace2, trace3], layout);
    }

    setupInitialValues();
    updatePlot();
});
