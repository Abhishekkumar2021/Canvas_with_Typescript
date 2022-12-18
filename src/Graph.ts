const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas style
ctx.lineWidth = 3;
ctx.lineCap = "round";
ctx.font = "16px monospace";

// Types
type GraphNode = {
    x: number;
    y: number;
    radius: number;
    color: string;
    name: string;
}

type GraphEdge = {
    source: GraphNode;
    target: GraphNode;
}

type Graph = {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

// State
const nodes : GraphNode[] = [
]

const edges : GraphEdge[] = [
]

let graph: Graph = {
    nodes,
    edges
}

// Functions
function drawNode(node: GraphNode) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2, false);

    // Fill of the node
    ctx.save();
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.restore();

    // Border of the node
    ctx.arc(node.x, node.y, node.radius+2, 0, Math.PI * 2, false);
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Name of the node
    ctx.fillStyle = "black";
    ctx.fillText(node.name, node.x-4, node.y+6);
}

function drawEdge(edge: GraphEdge) {
    ctx.beginPath();
    ctx.moveTo(edge.source.x, edge.source.y);
    ctx.lineTo(edge.target.x, edge.target.y);
    ctx.strokeStyle = "white";
    ctx.stroke();
}

function drawGraph(graph: Graph) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graph.edges.forEach(drawEdge);
    graph.nodes.forEach(drawNode);
}

function addNode(x: number, y: number, name: string) {
    const node: GraphNode = {
        x,
        y,
        radius: 30,
        color: "orange",
        name
    }
    graph.nodes.push(node);
}

function addEdge(source: GraphNode, target: GraphNode) {
    const edge: GraphEdge = {
        source,
        target
    }
    graph.edges.push(edge);
}

function getNodeAt(x: number, y: number) : GraphNode | undefined {
    return graph.nodes.find(node => {
        const dx = node.x - x;
        const dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) < node.radius;
    })
}

function getEdgeAt(x: number, y: number) : GraphEdge | undefined {
    return graph.edges.find(edge => {
        const dx = edge.source.x - x;
        const dy = edge.source.y - y;
        return Math.sqrt(dx * dx + dy * dy) < edge.source.radius;
    })
}

// Draw the graph
addNode(100, 160, "A");
addNode(200, 410, "B");
addNode(300, 560, "C");
addNode(400, 600, "D");
addNode(500, 130, "E");

addEdge(graph.nodes[0], graph.nodes[1]);
addEdge(graph.nodes[1], graph.nodes[2]);
addEdge(graph.nodes[2], graph.nodes[3]);
addEdge(graph.nodes[3], graph.nodes[4]);
addEdge(graph.nodes[3], graph.nodes[1]);

drawGraph(graph);


// Event Listeners

canvas.addEventListener("click", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const node = getNodeAt(x, y);
    if (node) {
        node.color = "lightgreen";
        drawGraph(graph);
    }
});

canvas.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const node = getNodeAt(x, y);
    if (node) {
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "default";
    }
});

// Drag and drop the node

let dragNode: GraphNode | undefined = undefined;

canvas.addEventListener("mousedown", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const node = getNodeAt(x, y);
    if (node) {
        dragNode = node;
    }
});

canvas.addEventListener("mouseup", (event) => {
    dragNode = undefined;
});

canvas.addEventListener("mousemove", (event) => {
    if (dragNode) {
        dragNode.x = event.clientX;
        dragNode.y = event.clientY;
        drawGraph(graph);
    }
});

// Drag and drop the edge

let dragEdge: GraphEdge | undefined = undefined;

canvas.addEventListener("mousedown", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const edge = getEdgeAt(x, y);
    if (edge) {
        dragEdge = edge;
    }
});

canvas.addEventListener("mouseup", (event) => {
    dragEdge = undefined;
});

canvas.addEventListener("mousemove", (event) => {
    if (dragEdge) {
        dragEdge.source.x = event.clientX;
        dragEdge.source.y = event.clientY;
        drawGraph(graph);
    }
});


export { }





