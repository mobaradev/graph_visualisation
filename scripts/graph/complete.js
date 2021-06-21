class CompleteGraph {
    static isGraphComplete(graph) {
        let isComplete = true;

        let nNodes = graph.nodes.length;
        let nEdges = graph.edges.length;

        if (((nNodes) * (nNodes - 1) / 2) !== nEdges) isComplete = false;

        return isComplete;
    }
}