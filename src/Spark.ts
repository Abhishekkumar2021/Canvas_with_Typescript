const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

type Ball = {
    x: number;
    y: number;
    radius: number;
    color: string;
    vx : number;
    vy : number;
}

interface Spark {
    balls: Ball[];
    addBall(ball: Ball): void;
    draw(): void;
    update(): void;
}

class Spark implements Spark {
    constructor() {
        this.balls = [];
    }
    addBall(ball: Ball) {
        this.balls.push(ball);
    }
    draw() {
        this.balls.forEach(ball => {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.closePath();
        });
    }
    update() {
        this.balls.forEach(ball => {
            ball.x += ball.vx;
            ball.y += ball.vy;
            if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.vx = -ball.vx;
            }
            if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                ball.vy = -ball.vy;
            }
            if(ball.radius > 0.2) {
                ball.radius -= 0.1;
            }
        });
    }
}

const spark = new Spark();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spark.draw();
    spark.update();
}

function randomIntFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
    return `hsl(${Math.random() * 360}, 50%, 50%)`;
}

animate();

canvas.addEventListener('click', (event) => {
    for(let i = 0; i < 100; i++)
    spark.addBall({
        x: event.clientX,
        y: event.clientY,
        radius: randomIntFromRange(10, 20),
        color: randomColor(),
        vx: randomIntFromRange(-2, 2),
        vy: randomIntFromRange(-2, 2)
    });
});

