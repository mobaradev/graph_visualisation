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
        if (firstNodeId == secondNodeId) return console.log("You cannot connect node with itself.")
        let newEdge = new GraphEdge(firstNodeId, secondNodeId);

        if (this.isEdgeConnected(firstNodeId, secondNodeId)) return console.log("Edge already connected.");

        newEdge.id = this.edgesAdded++;
        this.edges.push(newEdge);
    }

    deleteNode(nodeID) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === nodeID) {
                // remove this edge
                this.nodes.splice(i, 1);
            }
        }
    }

    deleteEdge(edgeID) {
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i].id === edgeID) {
                // remove this edge
                this.edges.splice(i, 1);
            }
        }
    }

    getNodeFromId(id) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === id) {
                return this.nodes[i];
            }
        }
        return null;
    }

    getEdgesConnectedToNodeId(id) {
        let edgesConnected = [];
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i].firstNodeId === id || this.edges[i].secondNodeId === id) {
                edgesConnected.push(this.edges[i]);
            }
        }
        return edgesConnected;
    }

    getEdgeBetweenNodes(firstNodeId, secondNodeId) {
        let ids = [firstNodeId, secondNodeId];
        for (let i = 0; i < this.edges.length; i++) {
            if (ids.includes(this.edges[i].firstNodeId) && ids.includes(this.edges[i].secondNodeId)) {
                return this.edges[i];
            }
        }
        return null;
    }

    isEdgeConnected(firstNodeId, secondNodeId) {
        let ids = [firstNodeId, secondNodeId];
        for (let i = 0; i < this.edges.length; i++) {
            if (ids.includes(this.edges[i].firstNodeId) && ids.includes(this.edges[i].secondNodeId)) {
                return true;
            }
        }
        return false;
    }

    getAdjacentNodes(node) {
        if (!node) return;
        let adjacentNodes = [];
        let edgesConnected = this.getEdgesConnectedToNodeId(node.id);

        for (let i = 0; i < edgesConnected.length; i++) {
            if (edgesConnected[i].firstNodeId === node.id) {
                adjacentNodes.push(this.getNodeFromId(edgesConnected[i].secondNodeId));
            } else {
                adjacentNodes.push(this.getNodeFromId(edgesConnected[i].firstNodeId));
            }
        }

        return adjacentNodes;
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
    id;
    firstNodeId;
    secondNodeId;
    constructor(firstNodeId, secondNodeId) {
        this.firstNodeId = firstNodeId;
        this.secondNodeId = secondNodeId;
    }
}