class Main extends Scene {
    constructor() {
        super();
        this.panel = new Panel();
        this.graph = new Graph();
    }
    handle() {
        this.handleInput();
        this.render();
    }
    render() {
        // draw background
        ctx.fillStyle = '#dedede';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.renderNodes();


        // render panel
        this.panel.render();

        // draw "mouse cursor"
        ctx.fillStyle = 'rgb(100, 110, 220)';
        ctx.fillRect(inputManager.mouse.x, inputManager.mouse.y, 50, 50);
        this.renderEdges();
    }

    renderNodes() {
        let nodes = this.graph.nodes;

        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isPointInRect([inputManager.mouse.x, inputManager.mouse.y], [nodes[i].posX, nodes[i].posY, 20, 20])) {
                ctx.fillStyle = 'rgb(30, 90, 200)';
            } else {
                // default color
                ctx.fillStyle = 'rgb(50, 110, 220)';
            }

            ctx.fillRect(nodes[i].posX, nodes[i].posY, 20, 20);
        }
    }

    renderEdges() {
        let edges = this.graph.edges;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;

        for (let i = 0; i < edges.length; i++) {
            let nodeA = this.graph.getNodeFromId(edges[i].firstNodeId);
            let nodeB = this.graph.getNodeFromId(edges[i].secondNodeId);
            ctx.beginPath();
            ctx.moveTo(nodeA.posX, nodeA.posY);
            ctx.lineTo(nodeB.posX, nodeB.posY);
            ctx.stroke();
        }
    }

    handleInput() {
        if (inputManager.mouse.isPressed) {
            let mouseData = inputManager.mouse;
            this.graph.addNode(mouseData.x, mouseData.y);
        }
    }
}