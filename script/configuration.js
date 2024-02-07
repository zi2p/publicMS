document.addEventListener('DOMContentLoaded', function () {
    generateBallInputs(); // Вызываем функцию при загрузке документа
});

function generateBallInputs() {
    const ballCount = document.getElementById('ballCount').value;
    const ballParametersDiv = document.getElementById('ballParameters');
    ballParametersDiv.innerHTML = ''; // Очищаем предыдущие поля

    for (let i = 0; i < ballCount; i++) {
        const ballNumber = i + 1;
        const ballDiv = document.createElement('div');

        ballDiv.innerHTML = `
          <h3>Ball ${ballNumber}</h3>
          <label for="color${ballNumber}">Color:</label>
          <input type="color" id="color${ballNumber}" name="color${ballNumber}" required>

          <label for="initialX${ballNumber}">Initial X:</label>
          <input type="number" id="initialX${ballNumber}" name="initialX${ballNumber}" value="0" min="50" max="750" required>

          <label for="initialY${ballNumber}">Initial Y:</label>
          <input type="number" id="initialY${ballNumber}" name="initialY${ballNumber}" value="0" min="50" max="500" required>

          <label for="vx${ballNumber}">Initial VX:</label>
          <input type="number" id="vx${ballNumber}" name="vx${ballNumber}" value="2" min="-5" max="5" required>

          <label for="vy${ballNumber}">Initial VY:</label>
          <input type="number" id="vy${ballNumber}" name="vy${ballNumber}" value="2" min="-5" max="5" required>

          <hr>
        `;

        ballParametersDiv.appendChild(ballDiv);
    }
}

function toggleForm() {
    var form = document.getElementById('configForm');
    form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
}

function generateRandomParameters() {
    const ballCount = document.getElementById('ballCount').value;

    for (let i = 0; i < ballCount; i++) {
        const ballNumber = i + 1;
        const initialXInput = document.getElementById(`initialX${ballNumber}`);
        const initialYInput = document.getElementById(`initialY${ballNumber}`);
        const vxInput = document.getElementById(`vx${ballNumber}`);
        const vyInput = document.getElementById(`vy${ballNumber}`);

        // Генерация случайных валидных значений

        initialXInput.value = Math.floor(Math.random() * (700 - 100 + 1)) + 100;
        initialYInput.value = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

        // Генерация случайных значений для скоростей от -5 до 5
        vxInput.value = Math.floor(Math.random() * (5 - -5 + 1)) + -5;
        vyInput.value = Math.floor(Math.random() * (5 - -5 + 1)) + -5;

        // Генерация случайного цвета
        const colorInput = document.getElementById(`color${ballNumber}`);
        colorInput.value = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
}

document.getElementById('ballCount').addEventListener('input', generateBallInputs);