const latitudeInput = document.getElementById('latitudeInput');
const resultElement = document.getElementById('result');
const plusBtn = document.getElementById('plus_btn');
const minusBtn = document.getElementById('minus_btn');
let zoom = window.screen.width > 432 ? 2.8 : 1.6;
let customLatitude = null;
let customLongitude = null;
let marker

const map = WE.map('map', { zoom: zoom, dragging: true, scrollWheelZoom: true });

function init() {
    map.on("click", function (e) {
        customLatitude = e.latlng.lat.toFixed(5);
        customLongitude = e.latlng.lng.toFixed(5);
        latitudeInput.value = customLatitude
        // addMarker(e.latlng.lat.toFixed(5), e.latlng.long.toFixed(5))
        addMarker()
    })

    WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', { tileSize: 200, tms: true }).addTo(map);
}

function calculateGravity() {
    const latitude = parseFloat(latitudeInput.value);

    if (isNaN(latitude)) {
        alert('Введите корректное значение широты');
        return;
    }
    if (latitude > 90 || latitude < -90) {
        alert('Введите широту от -90 до 90');
        return;
    }

    const gravity = calculateGravityAtLatitude(latitude);
    resultElement.textContent = `На широте ${latitude}° g=${gravity.toFixed(3)} м/с²`;
}

function calculateGravityAtLatitude(latitude) {
    //const g0 = 9.78; // Ускорение свободного падения на экваторе
    //const omegaSquared = 7.2921159e-5 ** 2; // Квадрат угловой скорости вращения Земли
    //const sinSquared = Math.sin(latitude * (Math.PI / 180)) ** 2; // Квадрат 
    //const eSquared = 0.00669438 // Квадрат эксцентриситета Земли
    const g0 = 9.78;
    const sin1 = 0.005302;
    const sin2 = 0.000006;
    return g0 * (1 + sin1 * Math.sin(latitude * (Math.PI / 180))**2 - sin2 * Math.sin(2 * latitude * (Math.PI / 180))**2);
}

function zoomIn() {
    zoom = map.getZoom()
    zoom += 0.2
    map.setZoom(zoom)
}

function zoomOut() {
    zoom = map.getZoom()
    zoom -= 0.2
    map.setZoom(zoom)
}

function rotateTop() {
    const pos = map.getPosition()
    map.setCenter([pos[0] + 10, pos[1]])
}

function rotateBottom() {
    const pos = map.getPosition()
    map.setCenter([pos[0] - 10, pos[1]])
}

function rotateLeft() {
    const pos = map.getPosition()
    map.setCenter([pos[0], pos[1] - 10])
}

function rotateRight() {
    const pos = map.getPosition()
    map.setCenter([pos[0], pos[1] + 10])
}

function addMarker() {
    if (marker) marker.removeFrom(map)
    marker = WE.marker([customLatitude, customLongitude]).addTo(map);
}
