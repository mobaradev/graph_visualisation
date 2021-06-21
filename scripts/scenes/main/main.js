class Main extends Scene {
    constructor() {
        super();
        this.panel = new Panel();
        this.sidebar = new Sidebar();
        this.sidepanel = new Sidepanel();
        this.graph = new Graph();
        this.currentAction = null;
        this.nextAction = null;

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


        // handle (top) panel
        this.panel.handle();

        // handle sidebar
        this.sidebar.handle();

        // handle sidepanel
        this.sidepanel.handle();

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
        if (this.nodeSelected == null) return this.selectNode();

        let firstNodeId = this.nodeSelected.id;

        let nodes = this.graph.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([nodes[i].posX, nodes[i].posY, 20, 20])) {


                this.graph.addEdge(firstNodeId, nodes[i].id);
                this.nodeSelected = null;
            }
        }

        this.refreshSidepanelData();
    }

    moveNode() {
        if (this.nodeSelected == null) return this.selectNode();
        let mouseData = inputManager.mouse;

        let nodes = this.graph.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (ProgramManager.renderManager.isMouseInRect([nodes[i].posX, nodes[i].posY, 20, 20])) {
                this.nodeSelected = null;
                return;
            }
        }

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