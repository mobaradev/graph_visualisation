class Main extends Scene {
    constructor() {
        super();
        this.panel = new Panel();
        this.graph = new Graph();
        this.currentAction = null;

        this.nodeSelected = null;
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


        // habdke panel
        this.panel.handle();

        // draw "mouse cursor"
        ctx.fillStyle = 'rgb(100, 110, 220)';
        ctx.fillRect(inputManager.mouse.x, inputManager.mouse.y, 50, 50);
        this.renderEdges();
    }

    renderNodes() {
        let nodes = this.graph.nodes;

        for (let i = 0; i < nodes.length; i++) {
            if (this.nodeSelected === nodes[i]) {
                ctx.fillStyle = 'rgb(200, 25, 25)';
                ctx.fillRect(nodes[i].posX - 2, nodes[i].posY - 2, 24, 24);
            }


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
        if (inputManager.mouse.isPressed && this.isMouseInArea()) {
            if (this.currentAction) this.currentAction();
        }
    }
    
    isMouseInArea() {
        if (ProgramManager.renderManager.isMouseInRect([0, 64, canvas.width, canvas.height - 64])) {
            return true;
        } else return false;
    }

    selectNode() {
        let mouseData = inputManager.mouse;
        let nodes = this.graph.nodes;

        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([nodes[i].posX, nodes[i].posY, 20, 20])) {
                this.nodeSelected = nodes[i];
            }
        }
    }

    addNode() {
        let mouseData = inputManager.mouse;
        this.graph.addNode(mouseData.x, mouseData.y);
    }

    addEdge() {
        if (this.nodeSelected == null) return alert("Select node first!");

        let firstNodeId = this.nodeSelected.id;

        let nodes = this.graph.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([nodes[i].posX, nodes[i].posY, 20, 20])) {
                this.graph.addEdge(firstNodeId, nodes[i].id);
            }
        }
    }
}