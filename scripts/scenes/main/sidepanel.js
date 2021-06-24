class Sidepanel {
    positionX;
    positionY;
    width;
    height;
    contents = {};
    contentSelected = null;

    constructor() {
        this.width = 350;
        this.height = canvas.height;

        this.contents = {
            info: new SidepanelInfo(),
            cubic: new SidepanelCubic(),
            complete: new SidepanelComplete(),
            connected: new SidepanelConnected(),
            eulerian: new SidepanelEulerian(),
            about: new SidepanelAbout()
        }

        this.contentSelected = this.contents.cubic;
    }

    handle() {
        this.handleInput();
        this.render();
    }

    render() {
        this.positionX = ProgramManager.scenes.main.sidebar.positionX + ProgramManager.scenes.main.sidebar.width;
        this.positionY = 64;
        ctx.fillStyle = '#a3a0a0';
        ctx.fillRect(this.positionX, 64, this.width, this.height);

        // render content
        this.contentSelected.render();
    }

    handleInput() {

    }

    setContent(content) {
        this.contentSelected = this.contents[content];
        this.contentSelected.action();
    }
}

class SidepanelContent {
    name;
    title;
    subtitle;
    status;

    render() {
        // title
        ctx.font = "bold 26px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(this.title, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 45);

        // subtitle
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";

        ctx.mlFillText(this.subtitle, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 40 + 35, 350 - 40, 400, 'top', 'justify', 16);
    }

    action() {

    }
}

class SidepanelInfo extends SidepanelContent {
    constructor() {
        super();
        this.name = "Info";
        this.title = "Graph";
        this.subtitle = "Graph (in discrete mathematics) is a structure made of vertices and edges.";
        this.numberOfNodes = 0;
        this.numberOfEdges = 0;
        this.maximumDegree = 0;
        this.minimumDegree = 0;
    }

    render() {
        super.render();

        ctx.font = "bold 18px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText("Nodes: " + this.numberOfNodes, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 150);
        ctx.fillText("Edges: " + this.numberOfEdges, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 180);
        ctx.fillText("Max degree Δ(G): " + this.maximumDegree, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 210);
        ctx.fillText("Min degree δ(G): " + this.minimumDegree, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 240);
    }

    action() {
        this.numberOfNodes = ProgramManager.scenes.main.graph.nodes.length;
        this.numberOfEdges = ProgramManager.scenes.main.graph.edges.length;
        this.maximumDegree =  ProgramManager.scenes.main.graph.getMaximumDegree();
        this.minimumDegree =  ProgramManager.scenes.main.graph.getMinimumDegree();
    }
}

class SidepanelCubic extends SidepanelContent {
    constructor() {
        super();
        this.name = "Cubic";
        this.title = "Cubic graph";
        this.subtitle = "In the mathematical field of graph theory, a cubic graph is a graph in which all vertices have degree three. In other words, a cubic graph is a 3-regular graph. Cubic graphs are also called trivalent graphs. ";
        this.status = false;
    }

    render() {
        super.render();

        ctx.font = "bold 22px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText((this.status ? "The graph is cubic" : "The graph is not cubic"), ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 220);
    }

    action() {
        this.status = CubicGraph.isGraphCubic(ProgramManager.scenes.main.graph);
    }
}

class SidepanelComplete extends SidepanelContent {
    constructor() {
        super();
        this.name = "Complete";
        this.title = "Complete graph";
        this.subtitle = "In the mathematical field of graph theory, a complete graph is a simple undirected graph in which every pair of distinct vertices is connected by a unique edge. A complete digraph is a directed graph in which every pair of distinct vertices is connected by a pair of unique edges (one in each direction). ";
        this.status = false;
    }

    render() {
        super.render();

        ctx.font = "bold 22px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText((this.status ? "The graph is complete" : "The graph is not complete"), ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 220);
    }

    action() {
        this.status = CompleteGraph.isGraphComplete(ProgramManager.scenes.main.graph);
    }
}

class SidepanelConnected extends SidepanelContent {
    constructor() {
        super();
        this.name = "Connected";
        this.title = "Connected graph";
        this.subtitle = "In mathematics and computer science, connectivity is one of the basic concepts of graph theory: it asks for the minimum number of elements (nodes or edges) that need to be removed to separate the remaining nodes into two or more isolated subgraphs.";
        this.status = false;
    }

    render() {
        super.render();

        ctx.font = "bold 22px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText((this.status ? "The graph is connected" : "The graph is not connected"), ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 220);
    }

    action() {
        this.status = ConnectedGraph.isGraphConnected(ProgramManager.scenes.main.graph);
    }
}

class SidepanelEulerian extends SidepanelContent {
    constructor() {
        super();
        this.name = "Eulerian";
        this.title = "Eulerian graph";
        this.subtitle = "In graph theory, an Eulerian trail (or Eulerian path) is a trail in a finite graph that visits every edge exactly once (allowing for revisiting vertices).";
        this.status = false;
    }

    render() {
        super.render();

        ctx.font = "bold 22px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText((this.status ? "The graph is eulerian" : "The graph is not eulerian"), ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 220);
    }

    action() {
        this.status = EulerianGraph.isGraphEulerian(ProgramManager.scenes.main.graph);
    }
}

class SidepanelAbout extends SidepanelContent {
    constructor() {
        super();
        this.name = "About";
        this.title = "About";
        this.subtitle = "Program created by Michal Obara\n Gdańsk University of Technology \n s184262";
    }

    render() {
        super.render();

        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText("Version 0.6", ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 220);

        ctx.font = "15px Arial";
        ctx.mlFillText("Opened in " + navigator.userAgent + "\n\n Width: " + canvas.width + "\n Height: " + canvas.height, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 240, 350 - 40, 200, 'top', 'justify', 16);

        ctx.drawImage(Resources.images.about.GUT, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + ProgramManager.scenes.main.sidepanel.height - 180, 190*1.6, 52*1.6)
    }
}
