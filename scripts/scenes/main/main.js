class Main extends Scene {
    constructor() {
        super();
        this.panel = new Panel();
        this.sidebar = new Sidebar();
        this.sidepanel = new Sidepanel();
        this.graph = new Graph();
        this.currentClickAction = null;
        this.currentHoverAction = null;

        this.nodeSelected = null;
        this.scroll = 1.0;
        this.delta = {
            x: 0,
            y: 0
        }
    }
    handle() {
        this.handleInput();
        if (this.currentHoverAction != null) this.currentHoverAction();
        this.render();
    }
    render() {
        // draw background
        ctx.fillStyle = '#dedede';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.renderEdges();
        this.renderNodes();

        // render additional things
        this.renderAdditional();

        // handle (top) panel
        this.panel.handle();

        // handle sidebar
        this.sidebar.handle();

        // handle sidepanel
        this.sidepanel.handle();
    }

    renderNodes() {
        let nodes = this.graph.nodes;

        for (let i = 0; i < nodes.length; i++) {
            if (this.nodeSelected === nodes[i]) {
                ctx.fillStyle = 'rgb(200,25,25)';
                ctx.fillRect((nodes[i].posX + this.delta.x - 2)  * this.scroll, (nodes[i].posY + this.delta.y - 2) * this.scroll, 24 * this.scroll, 24 * this.scroll);
            }


            if (ProgramManager.renderManager.isPointInRect([inputManager.mouse.x, inputManager.mouse.y], [(nodes[i].posX + this.delta.x) * this.scroll, (nodes[i].posY + this.delta.y) * this.scroll, 20 * this.scroll, 20 * this.scroll])) {
                ctx.fillStyle = 'rgb(30, 90, 200)';
            } else {
                // default color
                ctx.fillStyle = 'rgb(50, 110, 220)';
            }

            ctx.fillRect((nodes[i].posX + this.delta.x) * this.scroll, (nodes[i].posY + this.delta.y) * this.scroll, 20 * this.scroll, 20 * this.scroll);
        }
    }

    renderEdges() {
        let edges = this.graph.edges;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5 * this.scroll;

        for (let i = 0; i < edges.length; i++) {
            let nodeA = this.graph.getNodeFromId(edges[i].firstNodeId);
            let nodeB = this.graph.getNodeFromId(edges[i].secondNodeId);
            ctx.beginPath();
            ctx.moveTo((nodeA.posX + this.delta.x + 12.5) * this.scroll, (nodeA.posY + this.delta.y + 12.5) * this.scroll);
            ctx.lineTo((nodeB.posX + this.delta.x + 12.5) * this.scroll, (nodeB.posY + this.delta.y + 12.5) * this.scroll);
            ctx.stroke();
        }
    }

    renderAdditional() {
        if (this.currentHoverAction === this.addEdgeHover) {
            this.addEdgeHover();
        }
    }

    handleInput() {
        if (inputManager.mouse.isPressed && this.isMouseInArea()) {
            if (this.currentClickAction) this.currentClickAction();
        }
        if (inputManager.mouse.wheelDirection) {
            if (inputManager.mouse.wheelDirection === "up") {
                this.scroll += 0.1;
            } else {
                this.scroll -= 0.1;
            }
        }

        if (inputManager.keyboard.W) {
            this.delta.y -= 25;
        } else if (inputManager.keyboard.S) {
            this.delta.y += 25;
        } else if (inputManager.keyboard.A) {
            this.delta.x -= 25;
        } else if (inputManager.keyboard.D) {
            this.delta.x += 25;
        }
    }

    isMouseInArea() {
        if (ProgramManager.renderManager.isMouseInRect([0, 64, ProgramManager.scenes.main.sidebar.positionX, canvas.height - 64])) {
            return true;
        } else return false;
    }

    selectNode() {
        let mouseData = inputManager.mouse;
        let nodes = this.graph.nodes;

        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([(nodes[i].posX + this.delta.x) * this.scroll, (nodes[i].posY + this.delta.y) * this.scroll, 20 * this.scroll, 20 * this.scroll])) {
                this.nodeSelected = nodes[i];
                return;
            }
        }
        this.nodeSelected = null;
    }

    addNode() {
        let mouseData = inputManager.mouse;
        this.graph.addNode((mouseData.x / this.scroll) - this.delta.x, (mouseData.y / this.scroll) - this.delta.y);

        this.refreshSidepanelData();
    }

    addEdge() {
        if (this.nodeSelected == null) {
            this.selectNode();
            this.currentHoverAction = this.addEdgeHover;
            return;
        }

        let firstNodeId = this.nodeSelected.id;

        let nodes = this.graph.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([(nodes[i].posX + this.delta.x) * this.scroll, (nodes[i].posY + this.delta.y) * this.scroll, (20) * this.scroll, (20) * this.scroll])) {
                this.graph.addEdge(firstNodeId, nodes[i].id);
                this.nodeSelected = null;
                this.currentHoverAction = null;
                this.refreshSidepanelData();
                return;
            }
        }

        // user clicked in a free space so cease adding edge
        this.currentHoverAction = null;
        this.nodeSelected = null;
    }

    addEdgeHover() {
        if (!this.nodeSelected) return;
        let mouseData = inputManager.mouse;
        ctx.strokeStyle = 'darkred';
        ctx.lineWidth = 3;

        let nodeA = this.graph.getNodeFromId(this.nodeSelected.id);
        ctx.beginPath();
        ctx.moveTo((nodeA.posX + this.delta.x + 12.5) * this.scroll, (nodeA.posY + this.delta.y + 12.5) * this.scroll);
        ctx.lineTo(mouseData.x, mouseData.y);
        ctx.stroke();
    }

    moveNode() {
        if (this.nodeSelected == null) {
            this.selectNode();
            this.currentHoverAction = this.moveNodeHover;
            return;
        }

        if (inputManager.mouse.isPressed && this.isMouseInArea()) {
            this.nodeSelected = null;
            this.currentHoverAction = null;
        }
    }

    moveNodeHover() {
        if (!this.nodeSelected) return;
        let mouseData = inputManager.mouse;
        this.nodeSelected.posX = (mouseData.x / this.scroll) - this.delta.x;
        this.nodeSelected.posY = (mouseData.y / this.scroll) - this.delta.y;
    }

    deleteNode() {
        let nodes = this.graph.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([(nodes[i].posX + this.delta.x) * this.scroll, (nodes[i].posY + this.delta.y) * this.scroll, 20 * this.scroll, 20 * this.scroll])) {
                // unpin all edges
                let edgesConnected = this.graph.getEdgesConnectedToNodeId(nodes[i].id);
                for (let j = 0; j < edgesConnected.length; j++) {
                    this.graph.deleteEdge(edgesConnected[j].id);
                }

                // and then remove node
                this.graph.deleteNode(nodes[i].id);
            }
        }

        this.refreshSidepanelData();
    }

    deleteEdge() {
        if (this.nodeSelected == null) {
            this.selectNode();
            return;
        }

        let nodes = this.graph.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([(nodes[i].posX + this.delta.x) * this.scroll, (nodes[i].posY + this.delta.y) * this.scroll, 20 * this.scroll, 20 * this.scroll])) {
                let edge = this.graph.getEdgeBetweenNodes(this.nodeSelected.id, nodes[i].id);
                if (edge) {
                    let edgeID = edge.id;
                    this.graph.deleteEdge(edgeID);
                    this.nodeSelected = null;
                    return;
                } else console.log("Error - no edge found!");
            }
        }

        // if clicked not in node, then reset the node selected
        this.nodeSelected = null;
    }

    unpinAllEdgesFromNode() {
        let nodes = this.graph.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([(nodes[i].posX + this.delta.x) * this.scroll, (nodes[i].posY + this.delta.y) * this.scroll, 20 * this.scroll, 20 * this.scroll])) {
                // unpin all edges
                let edgesConnected = this.graph.getEdgesConnectedToNodeId(nodes[i].id);
                for (let j = 0; j < edgesConnected.length; j++) {
                    this.graph.deleteEdge(edgesConnected[j].id);
                }
            }
        }

        this.refreshSidepanelData();
    }

    refreshSidepanelData() {
        this.sidepanel.contentSelected.action();
    }
}