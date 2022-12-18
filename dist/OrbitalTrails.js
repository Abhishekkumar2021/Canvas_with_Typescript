"use strict";
/*
Orbital trails -
Beautiful swirling rainbow particles!

This is a simple example of how to use the canvas API to draw
particles that move around the screen. The particles are drawn
as circles with a radius of 10 pixels. The particles move in a
random direction and change color as they move. The particles
leave a trail behind them that fades away over time.

*/
Object.defineProperty(exports, "__esModule", { value: true });
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
particles.push({
    angle: Math.random() * 2 * Math.PI,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    radius: 4,
    distance: Math.random() * 300,
    omega: Math.random() * 0.05,
});
function drawParticles() {
    context.fillStyle = "rgba(14, 14, 14,0.2)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.angle += particle.omega;
        const x = canvas.width / 2 + Math.cos(particle.angle) * particle.distance;
        const y = canvas.height / 2 + Math.sin(particle.angle) * particle.distance;
        context.beginPath();
        context.arc(x, y, particle.radius, 0, 2 * Math.PI);
        context.fillStyle = particle.color;
        context.fill();
    }
}
function animation() {
    drawParticles();
    requestAnimationFrame(animation);
}
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
document.addEventListener('click', (e) => {
    particles.push({
        angle: Math.random() * 2 * Math.PI,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        radius: 4,
        distance: distance(e.clientX, e.clientY, canvas.width / 2, canvas.height / 2),
        omega: Math.random() * 0.05,
    });
});
animation();
