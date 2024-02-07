const canvas = document.getElementById('mainWindow');
const content = canvas.getContext('2d')

fuelPanelwidth = 200;
fuelPanelheight = 50;

canvas.width = innerWidth
canvas.height = innerHeight

let gameStarted = false;

const backgroundImage = new Image();
backgroundImage.src = 'img/menu.png';

backgroundImage.onload = function () {
    drawMenu();
};

const customFont = new FontFace('DTM-Sans', 'url(DTM-Sans.otf)');

customFont.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
    drawMenu();
})

function drawMenu() {
    content.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    content.fillStyle = 'rgba(0, 0, 0, 0)';
    content.fillRect(0, 0, canvas.width, canvas.height);

    content.fillStyle = 'white';
    content.font = '50px DTM-Sans';

    const textWidth = content.measureText('Press Enter to start').width;
    const x = (canvas.width - textWidth) / 2;
    const y = canvas.height * 0.8;

    content.fillText('Press Enter to start', x, y);

    content.fillStyle = 'white';
    content.font = '30px DTM-Sans';

    const textWidth2 = content.measureText('Press R to restart the level').width;
    const x2 = (canvas.width - textWidth2) / 2;
    const y2 = canvas.height * 0.85;
    content.fillText('Press R to restart the level', x2, y2);
}

function startGame() {
    gameStarted = true;
    let flag = false;

    const backgroundImage1 = new Image();
    backgroundImage1.src = 'img/inner-menu.png';
    backgroundImage1.onload = function () {
        drawInMenu();
    };
    function clear() {
        content.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawGame() {
        let time = 0;
        let animflag = false;
        class Particle {
            constructor({ position, velocity, radius, color, fades }) {
                this.position = position
                this.velocity = velocity
                this.radius = radius
                this.color = color
                this.opacity = 1
                this.fades = fades
            }

            draw() {
                content.save()
                content.globalAlpha = this.opacity
                content.beginPath()
                content.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
                content.fillStyle = this.color
                content.fill()
                content.closePath()
                content.restore()
            }

            update() {
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y

                if (this.fades) this.opacity -= 0.01
            }
        }

        class Station {
            constructor() {
                this.position = {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                };

                this.scale = 0.15
                const image = new Image()
                image.src = 'img/station.png'
                image.onload = () => {
                    this.image = image
                    this.width = image.width * this.scale
                    this.height = image.height * this.scale
                    this._dockingPoint = {
                        x: 20,
                        y: image.height * this.scale / 2 + 9
                    }
                }
            }

            get dockingPoint() {
                return this._dockingPoint;
            }

            draw() {
                content.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
            }

            update() {
                if (this.image) {
                    this.draw()
                }
            }
        }

        class Planet {
            constructor() {
                this.position = {
                    x: 800,
                    y: 200
                }

                this.scale = 1.5
                this.rotation = 45
                const image = new Image()
                image.src = 'img/planet.png'
                image.onload = () => {
                    this.image = image
                    this.width = image.width * this.scale
                    this.height = image.height * this.scale
                }
            }

            draw() {
                content.save();
                content.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
                content.rotate(this.rotation);
                content.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
                content.restore();
            }

            update() {
                if (this.image) {
                    this.draw()
                }
            }
        }

        class Player {
            constructor() {
                this.position = {
                    x: Math.random() * canvas.width * 0.4,
                    y: Math.random() * canvas.height
                };

                this.velocity = {
                    x: 0,
                    y: 0
                };

                this.scale = 0.35;
                this.frameIndex = 0;
                this.frames = ['img/ship-anima-1.png', 'img/ship-anima-2.png', 'img/ship-anima-3.png'];
                this.loadImages();

                this.restingImage = new Image();
                this.restingImage.src = 'img/ship.png';
                this.isMoving = false;
            }

            loadImages() {
                this.images = [];
                this.frames.forEach((src, index) => {
                    const image = new Image();
                    image.src = src;
                    image.onload = () => {
                        this.images[index] = image;
                        if (index === 0) {
                            this.width = image.width * this.scale;
                            this.height = image.height * this.scale;
                        }
                    };
                });
            }

            draw() {
                let currentImage = this.isMoving ? this.images[this.frameIndex] : this.restingImage;

                if (currentImage) {
                    content.save();
                    content.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
                    content.rotate(this.rotation);
                    content.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
                    content.drawImage(currentImage, this.position.x, this.position.y, this.width, this.height);
                    content.restore();
                }
            }

            update(fuel) {
                if(!flag){
                    this.isMoving = ( keys['w'] || keys['a'] || keys['s'] || keys['d']
                        || keys['W'] || keys['A'] || keys['S'] || keys['D']
                        || keys['ц'] || keys['ф'] || keys['ы'] || keys['в']
                        || keys['Ц'] || keys['Ф'] || keys['Ы'] || keys['В']
                        || keys['ArrowUp'] ||keys['ArrowLeft'] || keys['ArrowDown'] || keys['ArrowRight']) && fuel > 0;
                }
                if (this.isMoving && this.images.length > 0) {
                    this.updateFrameIndex();
                }
                this.draw();
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
            }

            updateFrameIndex() {
                if (this.frameIndex === 2) {
                    this.frameIndex = 1;
                } else if (this.frameIndex === 0) {
                    this.frameIndex = 1;
                } else {
                    this.frameIndex = (this.frameIndex + 1) % this.frames.length;
                }
            }
        }


        class Background {
            constructor(path) {
                this.backgroundImage = new Image();
                this.backgroundImage.src = path;
            }

            drawBackground(x, y) {
                if (this.backgroundImage) {
                    content.drawImage(this.backgroundImage, x, y, canvas.width, canvas.height);
                }
            }
        }

        function createParticles() {
            for (let i = 0; i < 200; i++) {
                particles.push(new Particle({
                    position: {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height
                    },
                    velocity: {
                        x: -0.5,
                        y: 0
                    },
                    radius: Math.random() * 3,
                    color: '#d3ffff'
                }));
            }
        }

        const customFont = new FontFace('DTM-Sans', 'url(./DTM-Sans.otf)');
        customFont.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
        })

        function drawFuelPanel() {
            const borderWidth = 2;
            const margin = 2
            content.fillStyle = 'rgba(0, 0, 0, 0.4)';
            content.fillRect(margin, margin, fuelPanelwidth, fuelPanelheight);

            content.strokeStyle = 'white';
            content.lineWidth = borderWidth;
            content.strokeRect(margin, margin, fuelPanelwidth, fuelPanelheight);

            content.fillStyle = 'white';
            content.font = '25px DTM-Sans';

            const textWidth = content.measureText(`Fuel: ${fuel}`).width;
            const x = (fuelPanelwidth - textWidth) / 2;
            const y = (fuelPanelheight + 20) / 2;
            content.fillText(`Fuel: ${fuel}`, x, y);
        }

        function arePointsColliding(player, station) {
            if (!station || !station.dockingPoint) {
                return false;
            }
            const stationX = station.position.x + station.dockingPoint.x;
            const stationY = station.position.y + station.dockingPoint.y;
            const xCollision = player.position.x + player.width >= stationX && player.position.x <= stationX;
            const yCollision = player.position.y + player.height >= stationY && player.position.y <= stationY;

            return xCollision && yCollision;
        }

        let fuel = 50;
        const player = new Player()
        const station = new Station()
        const lowerBackground1 = new Background('img/lower-background.png');
        const lowerBackground2 = new Background('img/lower-background.png');
        const planet = new Planet()
        const upperBackground = new Background('img/upper-background.png');
        const particles = []
        let blockControl = false;

        createParticles();

        let x = 0
        let x2 = canvas.width
        let backgroundSpeed = 2

        function animate() {
            requestAnimationFrame(animate)
            content.fillStyle = 'black'
            content.fillRect(0, 0, canvas.width, canvas.height)
            upperBackground.drawBackground(0, 0);
            particles.forEach(particle => {
                if (particle.position.x + particle.radius <= 0) {
                    particle.position.x = canvas.width + particle.radius;
                    particle.position.y = Math.random() * canvas.height;
                }
                particle.update()
            })

            lowerBackground1.drawBackground(x, 0);
            if (x < -canvas.width) x = canvas.width + x2 - backgroundSpeed
            else x -= backgroundSpeed

            lowerBackground2.drawBackground(x2, 0);
            if (x2 < -canvas.width) x2 = canvas.width + x - backgroundSpeed
            else x2 -= backgroundSpeed

            planet.update()
            station.update()
            player.update(fuel)
            drawFuelPanel()

            if (flag) {
                drawInMenu()
            }

            if (fuel <= 0) {
                blockControl = true;
                fuel = 0
            }

            if (arePointsColliding(player, station, 80) && player.velocity.x <= 5 && player.velocity.y <= 5) {
                time += 1
                if (!animflag && time > 25) {
                    player.update()
                    animflag = true;
                    flag = true;
                    player.velocity.x = 0
                    player.velocity.y = 0
                }
            }
            else {
                time = 0;
            }

            if (!(station.position.x >= canvas.width / 2 && station.position.x <= canvas.width)) {
                station.position.x = Math.random() * canvas.width
            }
            if (!(station.position.y <= canvas.height && station.position.y >= 0)) {
                station.position.y = Math.random() * canvas.height
            }

            if (station.position.x < 0) station.position.x = 0
            if (station.position.x + station.width >= canvas.width) station.position.x = canvas.width - station.width - 50
            if (station.position.y < 0) station.position.y = 0
            if (station.position.y + station.height >= canvas.height) station.position.y = canvas.height - station.height - 50

            if (player.position.x <= 0) {
                player.velocity.x = 0
                player.position.x = 0
            }
            else if (player.position.x + player.width >= canvas.width) {
                player.velocity.x = 0
                player.position.x = canvas.width - player.width
            }

            if (player.position.y <= 0) {
                player.velocity.y = 0
                player.position.y = 0
            }
            else if (player.position.y + player.height >= canvas.height) {
                player.velocity.y = 0
                player.position.y = canvas.height - player.height
            }

            planet.position.x -= 0.1
            if (planet.position.x < -200) planet.position.x = 2000
        }

        animate()


        addEventListener('keydown', () => {
            const velocityValue = 1;
            if (!flag) {
                if (keys['R'] || keys['r'] || keys['К'] || keys['к']) {
                    fuel = 50
                    player.position.x = 200
                    player.position.y = canvas.height / 2
                    player.velocity.x = 0
                    player.velocity.y = 0
                    player.rotation = 0
                    time = 0;
                    blockControl = false;
                }
                if (blockControl) return
                if (keys['w'] || keys['ц'] || keys['ArrowUp'] || keys['W'] || keys['Ц']) {
                    player.velocity.y -= velocityValue;
                    player.rotation = 0
                    fuel -= velocityValue
                }
                else if (keys['a'] || keys['ф'] || keys['ArrowLeft'] || keys['A'] || keys['Ф']) {
                    player.rotation = -1.57
                    player.velocity.x -= velocityValue;
                    fuel -= velocityValue
                }
                else if (keys['s'] || keys['ы'] || keys['ArrowDown'] || keys['S'] || keys['Ы']) {
                    player.rotation = 3.15
                    player.velocity.y += velocityValue;
                    fuel -= velocityValue
                }
                else if (keys['d'] || keys['в'] || keys['ArrowRight'] || keys['D'] || keys['В']) {
                    player.rotation = 1.57
                    player.velocity.x += velocityValue;
                    fuel -= velocityValue
                }
                if (keys['w'] && keys['a'] || keys['ц'] && keys['ф'] || keys['ArrowUp'] && keys['ArrowLeft'] || keys['W'] && keys['A'] || keys['Ц'] && keys['Ф']) {
                    player.velocity.y -= velocityValue;
                    player.velocity.x -= velocityValue;
                    player.rotation = -0.8
                    fuel -= velocityValue
                } else if (keys['w'] && keys['d'] || keys['ц'] && keys['в'] || keys['ArrowUp'] && keys['ArrowRight'] || keys['W'] && keys['D'] || keys['Ц'] && keys['В']) {
                    player.velocity.y -= velocityValue;
                    player.velocity.x += velocityValue;
                    player.rotation = 0.8
                    fuel -= velocityValue
                } else if (keys['a'] && keys['s'] || keys['ф'] && keys['ы'] || keys['ArrowLeft'] && keys['ArrowDown'] || keys['A'] && keys['S'] || keys['Ф'] && keys['Ы']) {
                    player.velocity.y += velocityValue;
                    player.velocity.x -= velocityValue;
                    player.rotation = -2.4
                    fuel -= velocityValue
                } else if (keys['s'] && keys['d'] || keys['ы'] && keys['в'] || keys['ArrowDown'] && keys['ArrowRight'] || keys['S'] && keys['D'] || keys['Ы'] && keys['В']) {
                    player.velocity.y += velocityValue;
                    player.velocity.x += velocityValue;
                    player.rotation = 2.4
                    fuel -= velocityValue
                }
            }
        });
    }
    function drawInMenu() {
        content.globalAlpha = 1;
        content.drawImage(backgroundImage1, canvas.width * 0.5 - 300, canvas.height * 0.5 - 150, 600, 300);
        content.fillStyle = 'rgba(0, 0, 0, 0)';
        content.globalAlpha = 1;

        content.fillStyle = 'white';
        content.font = '100px DTM-Sans';
        const textWidth = content.measureText('YOU WIN').width;
        const x = (canvas.width) / 2 - textWidth / 2;
        const y = canvas.height * 0.5 - canvas.height * 0.3;

        content.fillStyle = 'white';
        content.font = '100px DTM-Sans';
        content.fillText('YOU WIN', x, y);

        content.fillStyle = 'gray';
        content.font = '35px DTM-Sans';
        const textWidth1 = content.measureText('Press Enter to restart the game').width;
        const x1 = canvas.width / 2 - textWidth1 / 2;
        const y1 = canvas.height * 0.5 + canvas.height * 0.4;
        content.fillText('Press Enter to restart the game', x1, y1);

        content.globalAlpha = 0.5;
        content.strokeStyle = 'purple';
        content.lineWidth = 10;
        content.strokeRect(canvas.width * 0.5 - 300, canvas.height * 0.5 - 150, 600, 300);
        content.globalAlpha = 1;

    }

    function drawInMenuInGame() {
        if (flag) {
            clear();
            drawInMenu();
        } else {
            clear();
            drawGame();
        }
    }

    drawInMenuInGame()

    addEventListener('keydown', () => {
        if (flag) {
            if (keys['Enter']) {
                flag = false;
                drawInMenuInGame();
            }
        }
    });

}

drawMenu();

const keys = {};

function handleKeyDown(event) {
    keys[event.key] = true;
}

function handleKeyUp(event) {
    keys[event.key] = false;
}



addEventListener('keydown', handleKeyDown);
addEventListener('keyup', handleKeyUp);

addEventListener('keydown', () => {

    if (!gameStarted) {
        if (keys['Enter']) {
            startGame();
        }
    }
});
