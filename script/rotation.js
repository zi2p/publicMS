import { name, factory } from './integral.js';

function saveToLocalStorage() {
    var beta = document.getElementById("beta").value;
    var omega = document.getElementById("omega").value;
    var phi = document.getElementById("phi").value;

    localStorage.setItem("beta", beta);
    localStorage.setItem("omega", omega);
    localStorage.setItem("phi", phi);
}

// Функция для загрузки значений из локального хранилища
function loadFromLocalStorage() {
    document.getElementById("beta").value = localStorage.getItem("beta") || "";
    document.getElementById("omega").value = localStorage.getItem("omega") || "";
    document.getElementById("phi").value = localStorage.getItem("phi") || "";
	
	const integral = factory();
}

// Вызов функции загрузки при загрузке страницы
window.onload = loadFromLocalStorage;

function calculate() {
	var beta = document.getElementById("beta").value;
	var input = document.getElementById("omega").value;
    var omega = input === '' ? 0 : parseFloat(input);
	input = document.getElementById("phi").value;
    var phi = input === '' ? 0 : parseFloat(input);
	
	try{
		var result = integral(beta, 't');
		document.getElementById("result").textContent = result;
        document.getElementById("error").textContent = '';
	} catch (e) {
		console.log(e);
		console.log(e.message);
		document.getElementById("result").textContent = '';
		document.getElementById("error").textContent = "Что-то пошло не так";
    }
		
    saveToLocalStorage();
}

window.calculate = calculate;
