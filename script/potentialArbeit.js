function saveToLocalStorage() {
    var x1 = document.getElementById("x1").value;
    var y1 = document.getElementById("y1").value;
    var x2 = document.getElementById("x2").value;
    var y2 = document.getElementById("y2").value;
    var u = document.getElementById("u").value;

    localStorage.setItem("x1", x1);
    localStorage.setItem("y1", y1);
    localStorage.setItem("x2", x2);
    localStorage.setItem("y2", y2);
    localStorage.setItem("u", u);
}

// Функция для загрузки значений из локального хранилища
function loadFromLocalStorage() {
    document.getElementById("x1").value = localStorage.getItem("x1") || "";
    document.getElementById("y1").value = localStorage.getItem("y1") || "";
    document.getElementById("x2").value = localStorage.getItem("x2") || "";
    document.getElementById("y2").value = localStorage.getItem("y2") || "";
    document.getElementById("u").value = localStorage.getItem("u") || "";
}

// Вызов функции загрузки при загрузке страницы
window.onload = loadFromLocalStorage;

function calculate() {
	var input = document.getElementById("x1").value
    var x1 = input === '' ? 0 : parseFloat(input);
	input = document.getElementById("y1").value
    var y1 = input === '' ? 0 : parseFloat(input);
	input = document.getElementById("x2").value
    var x2 = input === '' ? 0 : parseFloat(input);
	input = document.getElementById("y2").value
    var y2 = input === '' ? 0 : parseFloat(input);
	var u = document.getElementById("u").value;
	
	try{
		var u1 = math.evaluate(u, {x:x1,y:y1});
		var u2 = math.evaluate(u, {x:x2,y:y2});
        document.getElementById("error").textContent = '';
        document.getElementById("result").textContent = `Работа силы: ${(u2-u1).toFixed(3)} (Дж/кг)`;
	} catch (e) {
		console.log(e);
		console.log(e.message);
		if (e.message == 'Bad potential') {
			document.getElementById("result").textContent = '';
			document.getElementById("error").textContent = "Движение между этими точками в заданном потенциале невозможно";
		} else {
			document.getElementById("result").textContent = '';
			document.getElementById("error").textContent = "Не удалось распознать выражение для потенциала";
		}
    }
		
    saveToLocalStorage();
}
