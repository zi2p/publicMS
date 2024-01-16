// Инициализация слайдера
function initializeSlider(sliderId, outputId, onUpdate) {
    let slider = document.getElementById(sliderId);
    let output = document.getElementById(outputId);

    // Установка начальных значений из локального хранилища
    slider.value = localStorage.getItem(sliderId) || slider.value;
    output.innerHTML = slider.value;

    // Обработчик события изменения значения слайдера
    slider.oninput = function () {
        output.innerHTML = this.value;
        onUpdate();
        // Сохранение значения в локальное хранилище при изменении
        localStorage.setItem(sliderId, this.value);
    };
}

// Инициализация всех слайдеров
function initializeSliders() {
    initializeSlider("timeRange", "timeValue", updatePlot);
    initializeSlider("positionRange", "positionValue", updatePlot);
    initializeSlider("velocityRange", "velocityValue", updatePlot);
    initializeSlider("accelerationRange", "accelerationValue", updatePlot);
}

function updatePlot() {
    let t = parseInt(document.getElementById("timeRange").value);
    let x0 = parseInt(document.getElementById("positionRange").value);
    let v0 = parseInt(document.getElementById("velocityRange").value);
    let a = parseInt(document.getElementById("accelerationRange").value);

    t *= 10;
    let time = Array.from({ length: t + 1 }, (_, i) => i * 0.1);
    let coords = time.map((ti) => x0 + v0 * ti + 0.5 * a * ti ** 2);
    let velos = time.map((ti) => v0 + a * ti);
    let accels = new Array(t + 1).fill(a);

    let trace1 = {
        x: time,
        y: coords,
        type: 'scatter',
        name: 'Координата x материальной точки',
        line: { color: 'red' }
    };
    let trace2 = {
        x: time,
        y: velos,
        type: 'scatter',
        name: 'Скорость v_x материальной точки',
        line: { color: 'green' }
    };
    let trace3 = {
        x: time,
        y: accels,
        type: 'scatter',
        name: 'Ускорение a_x материальной точки',
        line: { color: 'blue' }
    };
    let layout1 = {
        title: 'Кинематика материальной точки, движущейся с постоянным ускорением a',
        xaxis: {
            title: 'Время, с'
        },
        yaxis: {
            title: 'Значение координаты x, м'
        }
    };
    let layout2 = {
        title: 'Кинематика материальной точки, движущейся с постоянным ускорением a',
        xaxis: {
            title: 'Время, с'
        },
        yaxis: {
            title: 'Значение скорости v, м/с'
        }
    };
    let layout3 = {
        title: 'Движение материальной точки, движущейся с постоянным ускорением a',
        xaxis: {
            title: 'Время, с'
        },
        yaxis: {
            title: 'Значение ускорения a, м/с<sup>2</sup>'
        }
    };

    Plotly.newPlot('plot1', [trace1], layout1);
    Plotly.newPlot('plot2', [trace2], layout2);
    Plotly.newPlot('plot3', [trace3], layout3);
}

// Вызываем инициализацию при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    initializeSliders();
    updatePlot();
});
