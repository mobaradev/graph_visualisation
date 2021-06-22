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
            ctx.moveTo(nodeA.posX + 12.5, nodeA.posY + 12.5);
            ctx.lineTo(nodeB.posX + 12.5, nodeB.posY + 12.5);
            ctx.stroke();
        }
    }

    renderAdditional() {
        if (this.currentHoverAction == this.addEdgeHover) {
            this.addEdgeHover();
        }
    }

    handleInput() {
        if (inputManager.mouse.isPressed && this.isMouseInArea()) {
            if (this.currentClickAction) this.currentClickAction();
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
            if (ProgramManager.renderManager.isMouseInRect([nodes[i].posX, nodes[i].posY, 20, 20])) {
                this.nodeSelected = nodes[i];
                return;
            }
        }
        this.nodeSelected = null;
    }

    addNode() {
        let mouseData = inputManager.mouse;
        this.graph.addNode(mouseData.x, mouseData.y);

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
            if (ProgramManager.renderManager.isMouseInRect([nodes[i].posX, nodes[i].posY, 20, 20])) {
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
        ctx.moveTo(nodeA.posX + 12.5, nodeA.posY + 12.5);
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
        this.nodeSelected.posX = mouseData.x;
        this.nodeSelected.posY = mouseData.y;
    }

    unpinAllEdgesFromNode() {
        let nodes = this.graph.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([nodes[i].posX, nodes[i].posY, 20, 20])) {
                // unpin all edges
                let edgesConnected = this.graph.getEdgesConnectedToNodeId(nodes[i].id);
                for (let j = 0; j < edgesConnected.length; j++) {
                    this.graph.deleteEdge(edgesConnected[j].id);
                }
            }
        }

        this.refreshSidepanelData();
    }

    deleteNode() {
        let nodes = this.graph.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([nodes[i].posX, nodes[i].posY, 20, 20])) {
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

    refreshSidepanelData() {
        this.sidepanel.contentSelected.action();
    }
}