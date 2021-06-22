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
    }

    render() {
        super.render();

        ctx.font = "bold 18px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText("Nodes: " + this.numberOfNodes, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 150);
        ctx.fillText("Edges: " + this.numberOfEdges, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 180);
    }

    action() {
        this.numberOfNodes = ProgramManager.scenes.main.graph.nodes.length;
        this.numberOfEdges = ProgramManager.scenes.main.graph.edges.length;
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
        ctx.fillText("Version 0.4", ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 220);

        ctx.font = "15px Arial";
        ctx.mlFillText("Opened in " + navigator.userAgent + "\n\n Width: " + canvas.width + "\n Height: " + canvas.height, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + 240, 350 - 40, 200, 'top', 'justify', 16);

        ctx.drawImage(Resources.images.about.GUT, ProgramManager.scenes.main.sidepanel.positionX + 20, ProgramManager.scenes.main.sidepanel.positionY + ProgramManager.scenes.main.sidepanel.height - 180, 190*1.6, 52*1.6)
    }
}

// Library: mltext.js
// Desciption: Extends the CanvasRenderingContext2D that adds two functions: mlFillText and mlStrokeText.
//
// The prototypes are:
//
// function mlFillText(text,x,y,w,h,vAlign,hAlign,lineheight);
// function mlStrokeText(text,x,y,w,h,vAlign,hAlign,lineheight);
//
// Where vAlign can be: "top", "center" or "button"
// And hAlign can be: "left", "center", "right" or "justify"
// Author: Jordi Baylina. (baylina at uniclau.com)
// License: GPL
// Date: 2013-02-21

function mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, fn) {
    text = text.replace(/[\n]/g, " \n ");
    text = text.replace(/\r/g, "");
    var words = text.split(/[ ]+/);
    var sp = this.measureText(' ').width;
    var lines = [];
    var actualline = 0;
    var actualsize = 0;
    var wo;
    lines[actualline] = {};
    lines[actualline].Words = [];
    i = 0;
    while (i < words.length) {
        var word = words[i];
        if (word == "\n") {
            lines[actualline].EndParagraph = true;
            actualline++;
            actualsize = 0;
            lines[actualline] = {};
            lines[actualline].Words = [];
            i++;
        } else {
            wo = {};
            wo.l = this.measureText(word).width;
            if (actualsize === 0) {
                while (wo.l > w) {
                    word = word.slice(0, word.length - 1);
                    wo.l = this.measureText(word).width;
                }
                if (word === "") return; // I can't fill a single character
                wo.word = word;
                lines[actualline].Words.push(wo);
                actualsize = wo.l;
                if (word != words[i]) {
                    words[i] = words[i].slice(word.length, words[i].length);
                } else {
                    i++;
                }
            } else {
                if (actualsize + sp + wo.l > w) {
                    lines[actualline].EndParagraph = false;
                    actualline++;
                    actualsize = 0;
                    lines[actualline] = {};
                    lines[actualline].Words = [];
                } else {
                    wo.word = word;
                    lines[actualline].Words.push(wo);
                    actualsize += sp + wo.l;
                    i++;
                }
            }
        }
    }
    if (actualsize === 0) lines[actualline].pop();
    lines[actualline].EndParagraph = true;

    var totalH = lineheight * lines.length;
    while (totalH > h) {
        lines.pop();
        totalH = lineheight * lines.length;
    }

    var yy;
    if (vAlign == "bottom") {
        yy = y + h - totalH + lineheight;
    } else if (vAlign == "center") {
        yy = y + h / 2 - totalH / 2 + lineheight;
    } else {
        yy = y + lineheight;
    }

    var oldTextAlign = this.textAlign;
    this.textAlign = "left";

    for (var li in lines) {
        var totallen = 0;
        var xx, usp;
        for (wo in lines[li].Words) totallen += lines[li].Words[wo].l;
        if (hAlign == "center") {
            usp = sp;
            xx = x + w / 2 - (totallen + sp * (lines[li].Words.length - 1)) / 2;
        } else if ((hAlign == "justify") && (!lines[li].EndParagraph)) {
            xx = x;
            usp = (w - totallen) / (lines[li].Words.length - 1);
        } else if (hAlign == "right") {
            xx = x + w - (totallen + sp * (lines[li].Words.length - 1));
            usp = sp;
        } else { // left
            xx = x;
            usp = sp;
        }
        for (wo in lines[li].Words) {
            if (fn == "fillText") {
                this.fillText(lines[li].Words[wo].word, xx, yy);
            } else if (fn == "strokeText") {
                this.strokeText(lines[li].Words[wo].word, xx, yy);
            }
            xx += lines[li].Words[wo].l + usp;
        }
        yy += lineheight;
    }
    this.textAlign = oldTextAlign;
}

(function mlInit() {
    CanvasRenderingContext2D.prototype.mlFunction = mlFunction;

    CanvasRenderingContext2D.prototype.mlFillText = function (text, x, y, w, h, vAlign, hAlign, lineheight) {
        this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, "fillText");
    };

    CanvasRenderingContext2D.prototype.mlStrokeText = function (text, x, y, w, h, vAlign, hAlign, lineheight) {
        this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, "strokeText");
    };
})();