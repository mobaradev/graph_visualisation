class Sidebar {
    buttons = [];
    buttonSelected;
    isSidepanelOpened = false;
    positionX;
    width;
    height;
    constructor() {
        this.width = 72;
        this.height = canvas.height;
        this.positionX = canvas.width - this.width;

        let infoButton = new SidebarInfoButton(0);
        this.buttons.push(infoButton)
        let cubicButton = new SidebarCubicButton(1);
        this.buttons.push(cubicButton)
        let completeButton = new SidebarCompleteButton(2);
        this.buttons.push(completeButton)
        let connectedButton = new SidebarConnectedButton(3);
        this.buttons.push(connectedButton)
        let eulerianButton = new SidebarEulerianButton(4);
        this.buttons.push(eulerianButton)


        let aboutButton = new SidebarAboutButton(-1);
        this.buttons.push(aboutButton)

        this.buttonSelected = null;
    }

    handle() {
        this.handleInput();
        this.render();
    }

    render() {
        if (this.isSidepanelOpened) {
            this.positionX = canvas.width - 72 - 350;
        } else this.positionX = canvas.width - 72;

        ctx.fillStyle = 'silver';
        ctx.fillRect(this.positionX, 32, this.width, this.height);

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].render();
        }
    }

    handleInput() {
        if (inputManager.mouse.isPressed) {
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].isMouseOverButton()) {
                    // unselect the currently selected button
                    if (this.buttonSelected) this.buttonSelected.isSelected = false;

                    // set the button as selected
                    this.buttonSelected = this.buttons[i];
                    this.buttons[i].isSelected = true;
                    this.buttons[i].onClickAction();
                }
            }
        }
    }
}

class SidebarButton {
    index;
    name;
    isSelected = false;
    constructor(index) {
        this.index = index
        if (index >= 0) {
            this.positionY = 32 + (index + 0) * 64;
        } else {
            this.positionY = canvas.height - (64 * Math.abs(this.index));
        }
    }

    render() {
        this.positionX = ProgramManager.scenes.main.sidebar.positionX;
        if (this.isMouseOverButton()) {
            ctx.fillStyle = '#968f8f';
        } else {
            if (this.isSelected) ctx.fillStyle = '#a3a0a0';
            else ctx.fillStyle = 'silver';
        }

        ctx.fillRect(this.positionX, this.positionY,72, 64);
        //ctx.drawImage(this.img, positionX, 0, 64, 64)

        // text
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.name, this.positionX + 72/2, this.positionY + 64 - 10);
    }

    isMouseOverButton() {
        return ProgramManager.renderManager.isMouseInRect([this.positionX, this.positionY, 72, 64]);
    }

    onClickAction() {
        ProgramManager.scenes.main.sidebar.isSidepanelOpened = !ProgramManager.scenes.main.sidebar.isSidepanelOpened;
        if (!ProgramManager.scenes.main.sidebar.isSidepanelOpened) this.isSelected = false;
    }
}

class SidebarInfoButton extends SidebarButton {
    constructor(index) {
        super(index);
        this.name = "Info";
    }

    onClickAction() {
        if (!ProgramManager.scenes.main.sidebar.isSidepanelOpened || ProgramManager.scenes.main.sidepanel.contentSelected.name == this.name) {
            SidebarButton.prototype.onClickAction();
        }
        ProgramManager.scenes.main.sidepanel.setContent("info")
    }
}

class SidebarCubicButton extends SidebarButton {
    constructor(index) {
        super(index);
        this.name = "Cubic";
    }

    onClickAction() {
        if (!ProgramManager.scenes.main.sidebar.isSidepanelOpened || ProgramManager.scenes.main.sidepanel.contentSelected.name == this.name) {
            SidebarButton.prototype.onClickAction();
        }
        ProgramManager.scenes.main.sidepanel.setContent("cubic")
    }
}

class SidebarCompleteButton extends SidebarButton {
    constructor(index) {
        super(index);
        this.name = "Complete";
    }

    onClickAction() {
        if (!ProgramManager.scenes.main.sidebar.isSidepanelOpened || ProgramManager.scenes.main.sidepanel.contentSelected.name == this.name) {
            SidebarButton.prototype.onClickAction();
        }
        ProgramManager.scenes.main.sidepanel.setContent("complete")
    }
}

class SidebarConnectedButton extends SidebarButton {
    constructor(index) {
        super(index);
        this.name = "Connected";
    }

    onClickAction() {
        if (!ProgramManager.scenes.main.sidebar.isSidepanelOpened || ProgramManager.scenes.main.sidepanel.contentSelected.name == this.name) {
            SidebarButton.prototype.onClickAction();
        }
        ProgramManager.scenes.main.sidepanel.setContent("connected")
    }
}

class SidebarEulerianButton extends SidebarButton {
    constructor(index) {
        super(index);
        this.name = "Eulerian";
    }

    onClickAction() {
        if (!ProgramManager.scenes.main.sidebar.isSidepanelOpened || ProgramManager.scenes.main.sidepanel.contentSelected.name == this.name) {
            SidebarButton.prototype.onClickAction();
        }
        ProgramManager.scenes.main.sidepanel.setContent("eulerian")
    }
}

class SidebarAboutButton extends SidebarButton {
    constructor(index) {
        super(index);
        this.name = "About";
    }

    onClickAction() {
        if (!ProgramManager.scenes.main.sidebar.isSidepanelOpened || ProgramManager.scenes.main.sidepanel.contentSelected.name == this.name) {
            SidebarButton.prototype.onClickAction();
        }
        ProgramManager.scenes.main.sidepanel.setContent("about")
    }
}