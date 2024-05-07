function saveToLocalStorage() {
    var x1 = document.getElementById("x1").value;
    var y1 = document.getElementById("y1").value;
    var z1 = document.getElementById("z1").value;
    var x2 = document.getElementById("x2").value;
    var y2 = document.getElementById("y2").value;
    var z2 = document.getElementById("z2").value;

    localStorage.setItem("x1", x1);
    localStorage.setItem("y1", y1);
    localStorage.setItem("z1", z1);
    localStorage.setItem("x2", x2);
    localStorage.setItem("y2", y2);
    localStorage.setItem("z2", z2);
}

// Функция для загрузки значений из локального хранилища
function loadFromLocalStorage() {
    document.getElementById("x1").value = localStorage.getItem("x1") || "";
    document.getElementById("y1").value = localStorage.getItem("y1") || "";
    document.getElementById("z1").value = localStorage.getItem("z1") || "";
    document.getElementById("x2").value = localStorage.getItem("x2") || "";
    document.getElementById("y2").value = localStorage.getItem("y2") || "";
    document.getElementById("z2").value = localStorage.getItem("z2") || "";
}

// Вызов функции загрузки при загрузке страницы
window.onload = loadFromLocalStorage;

function calculate() {
    var x1 = parseFloat(document.getElementById("x1").value);
    var y1 = parseFloat(document.getElementById("y1").value);
    var z1 = parseFloat(document.getElementById("z1").value);
    var x2 = parseFloat(document.getElementById("x2").value);
    var y2 = parseFloat(document.getElementById("y2").value);
    var z2 = parseFloat(document.getElementById("z2").value);	

    function angle(v1, v2) {
        angle = Math.acos((v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2]) / (Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1] + v1[2]*v1[2]) * Math.sqrt(v2[0]*v2[0] + v2[1]*v2[1] + v2[2]*v2[2])));
        if (isNaN(angle)) {
            angle = Math.PI;
        }
        if (angle <= Math.PI) {
            return radiansToDegrees(angle);
        } else {
            return radiansToDegrees(2 * Math.PI - angle);
        }
    }
	
	var x3 = y1*z2-y2*z1;
	var y3 = x2*z1-x1*z2;
	var z3 = x1*y2-x2*y1;

    var vec1 = [x1, y1, z1];
    var vec2 = [x2, y2, z2];
	
    var vec3 = [x3, y3, z3];

    var trace1 = {
        x: [0, vec1[0]],
        y: [0, vec1[1]],
        z: [0, vec1[2]],
        type: 'scatter3d',
        mode: 'lines',
        line: {
            color: 'blue',
            width: 4
        },
        name: 'Вектор 1'
    };
	
	var cone1 = {
        type: 'cone',
        colorscale: 'Blues',
        showscale: false,
        u: [vec1[0]/10],
        v: [vec1[1]/10],
        w: [vec1[2]/10],
        x: [vec1[0]],
        y: [vec1[1]],
        z: [vec1[2]]
    };

    var trace2 = {
        x: [0, vec2[0]],
        y: [0, vec2[1]],
        z: [0, vec2[2]],
        type: 'scatter3d',
        mode: 'lines',
        line: {
            color: 'red',
            width: 4
        },
        name: 'Вектор 2'
    };
	
	var cone2 = {
        type: 'cone',
        colorscale: 'Reds',
        showscale: false,
        u: [vec2[0]/10],
        v: [vec2[1]/10],
        w: [vec2[2]/10],
        x: [vec2[0]],
        y: [vec2[1]],
        z: [vec2[2]]
    };

    var trace3 = {
        x: [0, vec3[0]],
        y: [0, vec3[1]],
        z: [0, vec3[2]],
        type: 'scatter3d',
        mode: 'lines',
        line: {
            color: 'green',
            width: 5
        },
        name: 'Результирующий вектор'
    };
	
	var cone3 = {
        type: 'cone',
        colorscale: 'Greens',
        showscale: false,
        u: [vec3[0]/10],
        v: [vec3[1]/10],
        w: [vec3[2]/10],
        x: [vec3[0]],
        y: [vec3[1]],
        z: [vec3[2]]
    };

    var layout = {
        scene: {
            xaxis:{title: 'X'},
            yaxis:{title: 'Y'},
            zaxis:{title: 'Z'}
        },
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        }
    };

    var data = [trace1, trace2, cone1, cone2, trace3, cone3];
	
	document.getElementById("result").innerHTML = "Координаты результирующего вектора: ("+x3+", "+y3+", "+z3+"), его длина: " + Math.sqrt(x3**2+y3**2+z3**2).toFixed(3) + " (угол между заданными векторами: " + angle(vec1,vec2).toFixed(2) + "°)";

    Plotly.newPlot('plot', data, layout);

    function radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    saveToLocalStorage();
}
