/*
This is a project to create a fractal tree using the canvas element in HTML5.
The tree is created using recursion.

The tree is created by drawing a line from the top of the canvas to the bottom.
Then, the line is split into two lines, one at a 45 degree angle to the left and
one at a 45 degree angle to the right. The length of the new lines is 75% of the
length of the original line. This process is repeated until the length of the
lines is less than 10 pixels.

*/

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = 'lightgreen';
context.lineWidth = 5;
context.lineCap = 'round';

function drawLine(x1: number, y1: number, x2: number, y2: number) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawTree(x1: number, y1: number, angle: number, depth: number) {
    if (depth === 0) return;
    const x2 = x1 + Math.cos(angle * Math.PI / 180) * depth * 10.0;
    const y2 = y1 + Math.sin(angle * Math.PI / 180) * depth * 10.0;
    drawLine(x1, y1, x2, y2);
    drawTree(x2, y2, angle - 20, depth - 1);
    drawTree(x2, y2, angle + 20, depth - 1);
}

drawTree(canvas.width / 2, canvas.height, -90, 10);

export { };