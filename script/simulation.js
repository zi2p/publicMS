let ballParameters;

let canvas;
let ctx;

let infoDiv;

let balls;
let centerMass;

let lastTimestamp = 0;
const fpsInterval = 1000 / 240; // 60 frames per second

function getBallsParameters() {
    const ballCount = document.getElementById('ballCount').value;
    const ballParameters = [];

    for (let i = 0; i < ballCount; i++) {
        const ballNumber = i + 1;
        const color = document.getElementById(`color${ballNumber}`).value;
        const initialX = parseInt(document.getElementById(`initialX${ballNumber}`).value);
        const initialY = parseInt(document.getElementById(`initialY${ballNumber}`).value);
        const vx = parseInt(document.getElementById(`vx${ballNumber}`).value);
        const vy = parseInt(document.getElementById(`vy${ballNumber}`).value);

        ballParameters.push({
            color,
            initialX,
            initialY,
            vx,
            vy
        });
    }

    return ballParameters;
}

function startSimulation() {
    ballParameters = getBallsParameters();

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    infoDiv = document.getElementById('info');

    balls = [];
    centerMass = { x: 0, y: 0, vx: 0, vy: 0, mass: 0 };
    initializeBalls();
    draw();
}

function drawGrid() {
    const gridSize = 50;
    const gridColor = '#ccc';

    // Draw vertical lines
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = gridColor;
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = gridColor;
        ctx.stroke();
    }
}

function drawAxes() {
    // Draw x-axis arrow
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fillText('X', canvas.width - 10, 10);

    // Draw y-axis arrow
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fillText('Y', 10, canvas.height - 10);

    // draw x-axis numbers
    for (let x = 0; x < canvas.width; x += 50) {
        ctx.fillText(x.toString(), x, 10);
    }

    // draw y-axis numbers
    for (let y = 0; y < canvas.height; y += 50) {
        ctx.fillText(y.toString(), 10, y);
    }
}


function initializeBalls() {
    for (const params of ballParameters) {
        balls.push({
            color: params.color,
            x: params.initialX,
            y: params.initialY,
            vx: params.vx,
            vy: params.vy,
            mass: 1, // каждый шарик имеет массу 1
        });
        centerMass.x += params.initialX;
        centerMass.y += params.initialY;
        centerMass.vx += params.vx;
        centerMass.vy += params.vy;
        centerMass.mass++;
    }

    centerMass.x /= centerMass.mass;
    centerMass.y /= centerMass.mass;
    centerMass.vx /= centerMass.mass;
    centerMass.vy /= centerMass.mass;
}

function update() {
    for (const ball of balls) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Handle collisions with walls (elastic collision)
        if (ball.x < 0 || ball.x > canvas.width) {
            ball.vx *= -1;
        }

        if (ball.y < 0 || ball.y > canvas.height) {
            ball.vy *= -1;
        }
    }

    // Recalculate center mass position and velocity based on external forces
    centerMass.x = 0;
    centerMass.y = 0;
    centerMass.vx = 0;
    centerMass.vy = 0;

    for (const ball of balls) {
        centerMass.x += ball.x * ball.mass;
        centerMass.y += ball.y * ball.mass;
        centerMass.vx += ball.vx * ball.mass;
        centerMass.vy += ball.vy * ball.mass;
    }

    centerMass.x /= centerMass.mass;
    centerMass.y /= centerMass.mass;
    centerMass.vx /= centerMass.mass;
    centerMass.vy /= centerMass.mass;
}

function draw(timestamp) {
    const elapsed = timestamp - lastTimestamp;

    // Check if enough time has passed to update the frame
    if (elapsed > fpsInterval) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        drawGrid();

        // Draw axes
        drawAxes();

        // Call the update function
        update();

        // Display center mass as a purple ball
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.arc(centerMass.x, centerMass.y, 10, 0, 2 * Math.PI);
        ctx.fill();

        // Draw balls
        for (const ball of balls) {
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Display information about center mass
        infoDiv.innerHTML = `Center Mass<br>`;
        infoDiv.innerHTML += `Position: (${centerMass.x.toFixed(2)}, ${centerMass.y.toFixed(2)})<br>`;
        infoDiv.innerHTML += `Velocity: (${centerMass.vx.toFixed(2)}, ${centerMass.vy.toFixed(2)})`;

        lastTimestamp = timestamp;
    }

    requestAnimationFrame(draw);
}

