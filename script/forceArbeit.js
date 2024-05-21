function saveToLocalStorage() {
    var x1 = document.getElementById("x1").value;
    var y1 = document.getElementById("y1").value;
    var x2 = document.getElementById("x2").value;
    var y2 = document.getElementById("y2").value;
    var F = document.getElementById("F").value;

    localStorage.setItem("x1", x1);
    localStorage.setItem("y1", y1);
    localStorage.setItem("x2", x2);
    localStorage.setItem("y2", y2);
    localStorage.setItem("F", F);
}

// Функция для загрузки значений из локального хранилища
function loadFromLocalStorage() {
    document.getElementById("x1").value = localStorage.getItem("x1") || "";
    document.getElementById("y1").value = localStorage.getItem("y1") || "";
    document.getElementById("x2").value = localStorage.getItem("x2") || "";
    document.getElementById("y2").value = localStorage.getItem("y2") || "";
    document.getElementById("F").value = localStorage.getItem("F") || "";
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
	var F = document.getElementById("F").value;
	const n = 10000;
	let dx = (x2-x1)/n;
	let dy = (y2-y1)/n;
	
	try{
		let a = 0;
		for (let i = 0; i < n; i++) {
			let x0 = x1 + i*dx;
			let x = x1 + (i+1)*dx;
			let y0 = y1 + i*dy;
			let y = y1 + (i+1)*dy;
			a += 0.5*(math.evaluate(F, {x:x0,y:y0})+math.evaluate(F, {x:x,y:y}))*Math.sqrt(dx**2+dy**2);
		}
        document.getElementById("error").textContent = '';
        document.getElementById("result").textContent = `Работа силы: ${a.toFixed(3)} (Дж)`;
	} catch (e) {
		console.log(e);
		console.log(e.message);
		document.getElementById("result").textContent = '';
		document.getElementById("error").textContent = "Что-то пошло не так";
    }
		
    saveToLocalStorage();
}
