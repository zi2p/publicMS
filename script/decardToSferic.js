    let xEl = document.getElementById("x");
    let yEl = document.getElementById("y");
    let zEl = document.getElementById("z");
    let rEl = document.getElementById("r");
    let thetaEl = document.getElementById("theta");
    let phiEl = document.getElementById("phi");

    function formatNumber(value) {
    const formatted = parseFloat(value).toFixed(3);
    return formatted.replace(/\.?0+$/, '');
    }

    function saveToLocalStorage(x, y, z, sphericalCoords) {
        localStorage.setItem('x', x);
        localStorage.setItem('y', y);
        localStorage.setItem('z', z);
        localStorage.setItem('r', sphericalCoords[0]);
        localStorage.setItem('theta', sphericalCoords[1]);
        localStorage.setItem('phi', sphericalCoords[2]);
    }

    function restoreFromLocalStorage() {
        xEl.value = localStorage.getItem('x') || '';
        yEl.value = localStorage.getItem('y') || '';
        zEl.value = localStorage.getItem('z') || '';

        rEl.textContent = localStorage.getItem('r') || '';
        thetaEl.textContent = localStorage.getItem('theta') || '';
        phiEl.textContent = localStorage.getItem('phi') || '';
    }

    function cartToSpherical(x, y, z) {
    let r = Math.sqrt(x * x + y * y + z * z);
    let theta = Math.atan2(y, x);
    let phi = Math.acos(z / r);
    return [formatNumber(r), formatNumber(theta), formatNumber(phi)];
    }

    function updateValues(x, y, z) {
        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            alert("Введите числовые значения для координат");
            return;
        }

        let sphericalCoords = cartToSpherical(x, y, z);

        rEl.textContent = sphericalCoords[0];
        thetaEl.textContent = sphericalCoords[1];
        phiEl.textContent = sphericalCoords[2];

        saveToLocalStorage(x, y, z, sphericalCoords);
    }

    window.onload = function () {
        restoreFromLocalStorage();
    };

    let convertBtn = document.getElementById("convert-btn");
    convertBtn.addEventListener("click", function () {
        let xVal = parseFloat(xEl.value);
        let yVal = parseFloat(yEl.value);
        let zVal = parseFloat(zEl.value);

        updateValues(xVal, yVal, zVal);
    });
    