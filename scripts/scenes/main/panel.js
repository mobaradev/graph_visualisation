class Panel {
    buttons = [];
    buttonSelected;
    constructor() {
        let selectNodeButton = new SelectNodePanelButton(0, "Select", "images/panel/add-button.png")
        this.buttons.push(selectNodeButton)
        let addNodeButton = new AddNodePanelButton(1, "Add node", "images/panel/add-button.png")
        this.buttons.push(addNodeButton)
        let addEdgeButton = new AddEdgePanelButton(2, "Add edge", "images/panel/add-button.png")
        this.buttons.push(addEdgeButton)
        let moveNodePanelButton = new MoveNodePanelButton(3, "Move node", "images/panel/add-button.png")
        this.buttons.push(moveNodePanelButton)
        let unpinAllNodeEdgesPanelButton = new UnpinAllNodeEdgesPanelButton(4, "Unpin edges", "images/panel/add-button.png")
        this.buttons.push(unpinAllNodeEdgesPanelButton)
        let deleteNodePanelButton = new DeleteNodePanelButton(5, "Delete node", "images/panel/add-button.png")
        this.buttons.push(deleteNodePanelButton)

        this.buttonSelected = this.buttons[0];
        this.buttons[0].isSelected = true;
    }

    handle() {
        this.handleInput();
        this.render();
    }

    render() {
        ctx.fillStyle = 'silver';
        ctx.fillRect(0, 0, canvas.width, 64);

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].render();
        }
    }

    handleInput() {
        if (inputManager.mouse.isPressed) {
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].isMouseOverButton()) {
                    // unselect the currently selected button
                    this.buttonSelected.isSelected = false;

                    // set the button as selected
                    this.buttonSelected = this.buttons[i];
                    this.buttons[i].isSelected = true;
                    this.buttons[i].onClickAction();
                }
            }
        }
    }
}

class PanelButton {
    index;
    name;
    isSelected = false;
    constructor(index, name, imgSrc) {
        this.img = new Image();
        this.img.src = imgSrc;

        this.name = name;

        this.index = index
        this.positionX = index * 72;
    }

    render() {
        if (this.isMouseOverButton()) {
            ctx.fillStyle = '#968f8f';
        } else {
            if (this.isSelected) ctx.fillStyle = '#a3a0a0';
            else ctx.fillStyle = 'silver';
        }

        ctx.fillRect(this.positionX, 0,72, 64);
        //ctx.drawImage(this.img, positionX, 0, 64, 64)

        // text
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.name, this.positionX + 72/2, 64 - 10);
    }

    isMouseOverButton() {
        return ProgramManager.renderManager.isMouseInRect([this.positionX, 0,72, 64]);
    }

    onClickAction() {
        ProgramManager.scenes.main.currentClickAction = null;
        ProgramManager.scenes.main.currentHoverAction = null;
        ProgramManager.scenes.main.nodeSelected = null;
    }
}

class SelectNodePanelButton extends PanelButton {
    onClickAction() {
        PanelButton.prototype.onClickAction();
        ProgramManager.scenes.main.currentClickAction = ProgramManager.scenes.main.selectNode;
    }
}

class AddNodePanelButton extends PanelButton {
    onClickAction() {
        PanelButton.prototype.onClickAction();
        ProgramManager.scenes.main.currentClickAction = ProgramManager.scenes.main.addNode;
    }
}

class AddEdgePanelButton extends PanelButton {
    onClickAction() {
        PanelButton.prototype.onClickAction();
        ProgramManager.scenes.main.currentClickAction = ProgramManager.scenes.main.addEdge;
    }
}

class MoveNodePanelButton extends PanelButton {
    onClickAction() {
        PanelButton.prototype.onClickAction();
        ProgramManager.scenes.main.currentClickAction = ProgramManager.scenes.main.moveNode;
    }
}

class UnpinAllNodeEdgesPanelButton extends PanelButton {
    onClickAction() {
        PanelButton.prototype.onClickAction();
        ProgramManager.scenes.main.currentClickAction = ProgramManager.scenes.main.unpinAllEdgesFromNode;
    }
}

class DeleteNodePanelButton extends PanelButton {
    onClickAction() {
        PanelButton.prototype.onClickAction();
        ProgramManager.scenes.main.currentClickAction = ProgramManager.scenes.main.deleteNode;
    }
}