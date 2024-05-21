function saveToLocalStorage() {
    var Lx = document.getElementById("Lx").value;
    var Ly = document.getElementById("Ly").value;
    var Lz = document.getElementById("Lz").value;
    var t = document.getElementById("t").value;

    localStorage.setItem("Lx", Lx);
    localStorage.setItem("Ly", Ly);
    localStorage.setItem("Lz", Lz);
    localStorage.setItem("t", t);
}

// Функция для загрузки значений из локального хранилища
function loadFromLocalStorage() {
    document.getElementById("Lx").value = localStorage.getItem("Lx") || "";
    document.getElementById("Ly").value = localStorage.getItem("Ly") || "";
    document.getElementById("Lz").value = localStorage.getItem("Lz") || "";
    document.getElementById("t").value = localStorage.getItem("t") || "";
}

// Вызов функции загрузки при загрузке страницы
window.onload = loadFromLocalStorage;

function calculate() {
	var Lx = document.getElementById("Lx").value;
	var Ly = document.getElementById("Ly").value;
	var Lz = document.getElementById("Lz").value;
	var input = document.getElementById("t").value;
    var t = input === '' ? 0 : parseFloat(input);
	
	try{
		var Mx = math.derivative(Lx, 't').evaluate({t: t});
		var My = math.derivative(Ly, 't').evaluate({t: t});
		var Mz = math.derivative(Lz, 't').evaluate({t: t});
		
        document.getElementById("error").textContent = '';
	} catch (e) {
		console.log(e);
		console.log(e.message);
		document.getElementById("result").textContent = '';
		document.getElementById("error").textContent = "Что-то пошло не так";
    }
		
    saveToLocalStorage();
}
