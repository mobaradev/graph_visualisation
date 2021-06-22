class ConnectedGraph {
    static isGraphConnected(graph) {
        this.graph = graph;
        let nodes = graph.nodes;
        let edges = graph.edges;
        if (nodes.length == 0) return true;

        this.nodesIds = [];
        for (let i = 0; i < nodes.length; i++) {
            this.nodesIds.push(nodes[i].id);
        }

        this.edgesIds = [];
        for (let i = 0; i < edges.length; i++) {
            this.edgesIds.push(edges[i].id);
        }

        // depth-first search algorithm
        this.nodesMet = [];
        this.visitNode(nodes[0]);

        if (this.nodesMet.length === nodes.length) {
            console.log(nodes)
            console.log(this.nodesMet)
            return true;
        } else {
            return false;
        }
    }

    static visitNode(node) {
        this.nodesMet.push(node);

        let adjacentNodes = this.graph.getAdjacentNodes(node);
        for (let i = 0; i < adjacentNodes.length; i++) {
            if (!this.nodesMet.includes(adjacentNodes[i])) {
                this.visitNode(adjacentNodes[i]);
            }
        }
    }
}