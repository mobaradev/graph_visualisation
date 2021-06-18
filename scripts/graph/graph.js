class Graph {
    nodes = [];
    edges = [];
    nodesAdded = 0;
    edgesAdded = 0;
    constructor() {
        console.log("Graph created!");
        this.nodesAdded = 0;
        this.edgesAdded = 0;

    }

    addNode(x, y) {
        console.log("Adding new node");
        let newNode = new GraphNode(x, y);
        newNode.id = this.nodesAdded++;
        this.nodes.push(newNode);
    }

    addEdge(firstNodeId, secondNodeId) {
        let newEdge = new GraphEdge(firstNodeId, secondNodeId);
        this.edges.push(newEdge);
    }

    getNodeFromId(id) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === id) {
                return this.nodes[i];
            }
        }
        return null;
    }
}

class GraphNode {
    id;
    posX;
    posY;

    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

}

class GraphEdge {
    constructor(firstNodeId, secondNodeId) {
        this.firstNodeId = firstNodeId;
        this.secondNodeId = secondNodeId;
    }
}