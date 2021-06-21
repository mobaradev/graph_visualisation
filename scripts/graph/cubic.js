class CubicGraph {
    static isGraphCubic(graph) {
        let isCubic = true;
        for (let i = 0; i < graph.nodes.length; i++) {
            let edgesConnected = graph.getEdgesConnectedToNodeId(graph.nodes[i].id);

            if (edgesConnected.length !== 3) isCubic = false;
        }

        return isCubic;
    }
}