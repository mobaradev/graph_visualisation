// this file is named eulerian_ with "_" at the end to avoid the adblock (adblock blocks all files named "eulerian.js"

class EulerianGraph {
    static isGraphEulerian(graph) {
        let isGraphConnected = ConnectedGraph.isGraphConnected(graph);
        if (!isGraphConnected) return false;

        // count odd nodes
        let oddNodesCounter = 0;

        for (let i = 0; i < graph.nodes.length; i++) {
            if (graph.getEdgesConnectedToNodeId(graph.nodes[i].id).length % 2 !== 0) {
                oddNodesCounter++;
            }
        }

        if (oddNodesCounter === 0) {
            return true;
        } else {
            return false;
        }
    }
}