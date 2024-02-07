const ctx_coords = document.getElementById("coords_canvas").getContext('2d');
const ctx_acceleration = document.getElementById("acceleration_canvas").getContext('2d');
const ctx_velocity = document.getElementById("velocity_canvas").getContext('2d');

const input_coords = document.getElementById("input_coords")
const input_velocity = document.getElementById("input_velocity")
const input_acceleration = document.getElementById("input_acceleration")

let configCoords, configAcceleration, configVelocity
let chart_coords, chart_acceleration, chart_velocity


function init() {
    configCoords = {
        bezierCurve: false,
        type: 'line', data: { datasets: [] },
        options: {
            bezierCurve: false,
            scales: {
                x: { type: 'linear', position: 'bottom', title: { display: true, text: 't (сек)' } },
                y: { type: 'linear', position: 'left', title: { display: true, text: 'x (м)' } }
            }
        },
    };
    configAcceleration = {
        type: 'line', data: { datasets: [] },
        options: {
            bezierCurve: false,
            scales: {
                x: { type: 'linear', position: 'bottom', title: { display: true, text: 't (сек)' } },
                y: { type: 'linear', position: 'left', title: { display: true, text: 'a (м/сек²)' } }
            }
        },
    };
    configVelocity = {
        type: 'line', data: { datasets: [] },
        options: {
            bezierCurve: false,
            scales: {
                x: { type: 'linear', position: 'bottom', title: { display: true, text: 't (сек)' } },
                y: { type: 'linear', position: 'left', title: { display: true, text: 'v (м/сек)' } }
            },
        }
    };

    chart_coords = new Chart(ctx_coords, configCoords);
    chart_acceleration = new Chart(ctx_acceleration, configAcceleration);
    chart_velocity = new Chart(ctx_velocity, configVelocity);
}

const getData = () => {
    const time = []
    for (let i = 1; i <= 41; i++) time.push(i * 0.25);
    console.log(time)
    const coords = [], acceleration = [], velocity = []

    chart_coords.destroy();
    chart_acceleration.destroy();
    chart_velocity.destroy();

    const coordsInputValue = document.getElementById('input_coords').value;
    const accelerationInputValue = document.getElementById('input_acceleration').value;
    const velocityInputValue = document.getElementById('input_velocity').value;


    if ((!coordsInputValue && !accelerationInputValue && !velocityInputValue)) {
        alert("Введите ф-ю в одно из полей")
    }

    else if (coordsInputValue) {
        for (let t = 0; t < time.length; t++) {
            x = nerdamer(coordsInputValue, { x: time[t] }).evaluate().text();
            const f = math.parse(coordsInputValue); // x^2
            const df = math.derivative(f, 'x') // derivative (x^2) = 2x 
            const ddf = math.derivative(df, 'x') // derivativ (2x) = 2
            v = df.evaluate({ x: time[t] })
            a = ddf.evaluate({ x: time[t] })

            coords.push(x)
            acceleration.push(a)
            velocity.push(v)
        }
    }

    else if (velocityInputValue) {
        for (let t = 0; t < time.length; t++) {
            v = nerdamer(velocityInputValue, { x: time[t] }).evaluate().text();
            const f = math.parse(velocityInputValue); // 2x
            const i = nerdamer.integrate(f).text(); // integrate(2x) = x^2
            const df = math.derivative(f, 'x') // derivative(2x) = 2
            x = nerdamer(i, { x: time[t] }).evaluate().text();
            a = df.evaluate({ x: time[t] })

            coords.push(x)
            acceleration.push(a)
            velocity.push(v)
        }
    }

    else if (accelerationInputValue) {
        for (let t = 0; t < time.length; t++) {
            a = nerdamer(accelerationInputValue, { x: time[t] }).evaluate().text();
            const f = math.parse(accelerationInputValue); // 2
            const i = nerdamer.integrate(f).text(); // integrate(2) = 2x
            const ii = nerdamer.integrate(i).text() // integrate(2x) = x^2
            x = nerdamer(ii, { x: time[t] }).evaluate().text();
            v = nerdamer(i, { x: time[t] }).evaluate().text();

            coords.push(x)
            acceleration.push(a)
            velocity.push(v)
        }
    }

    configCoords = {
        type: 'line',
        bezierCurve: false,
        data: {
            labels: Array.from({ length: time.length }, (_, i) => i * 0.25),
            datasets: [{ label: "Координата", borderColor: 'rgba(255, 205, 86, 1)', data: coords, lineTension: 0.4, pointRadius: 0 }],
        },
        options: {
            bezierCurve: false,
            scales: {
                x: { type: 'linear', position: 'bottom', title: { display: true, text: 't (сек)' } },
                y: { type: 'linear', position: 'left', title: { display: true, text: 'x (м)' } }
            }
        },
    };

    configVelocity = {
        type: 'line',
        data: {
            labels: Array.from({ length: time.length }, (_, i) => i * 0.25),
            datasets: [{ label: "Скорость", borderColor: 'rgba(255, 99, 132, 1)', data: velocity, lineTension: 0.4, pointRadius: 0 }],
        },
        options: {
            bezierCurve: false,
            scales: {
                x: { type: 'linear', position: 'bottom', title: { display: true, text: 't (сек)' } },
                y: { type: 'linear', position: 'left', title: { display: true, text: 'v (м/сек)' } }
            },
        },
    };

    configAcceleration = {
        type: 'line',
        data: {
            labels: Array.from({ length: time.length }, (_, i) => i * 0.25),
            datasets: [{ label: "Ускорение", borderColor: 'rgba(75, 192, 192, 1)', data: acceleration, lineTension: 0.4, pointRadius: 0 }],
        },
        options: {
            scales: {
                x: { type: 'linear', position: 'bottom', title: { display: true, text: 't (сек)' } },
                y: { type: 'linear', position: 'left', title: { display: true, text: 'a (м/сек²)' } }
            }
        },
    };

    chart_coords = new Chart(ctx_coords, configCoords);
    chart_velocity = new Chart(ctx_velocity, configVelocity);
    chart_acceleration = new Chart(ctx_acceleration, configAcceleration);
}

function clearAll() {
    input_coords.value = "";
    input_velocity.value = "";
    input_acceleration.value = "";
    input_coords.disabled = false;
    input_velocity.disabled = false;
    input_acceleration.disabled = false;
    chart_coords.destroy();
    chart_velocity.destroy();
    chart_acceleration.destroy();
    init()
}

function isActiveInputCoords() {
    if (input_coords.value !== "") {
        // init()
        input_velocity.value = "";
        input_acceleration.value = "";
        input_velocity.disabled = true;
        input_acceleration.disabled = true;
    } else {
        input_velocity.disabled = false;
        input_acceleration.disabled = false;
    }
}

function isActiveInputVelocity() {
    if (input_velocity.value !== "") {
        // init()
        input_coords.value = "";
        input_acceleration.value = "";
        input_coords.disabled = true;
        input_acceleration.disabled = true;
    } else {
        input_coords.disabled = false;
        input_acceleration.disabled = false;
    }
}

function isActiveInputAcceleration() {
    if (input_acceleration.value !== "") {
        // init()
        input_coords.value = "";
        input_velocity.value = "";
        input_coords.disabled = true;
        input_velocity.disabled = true;
    } else {
        input_coords.disabled = false;
        input_velocity.disabled = false;
    }
}