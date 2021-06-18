class Panel {
    buttons = []
    constructor() {
        let addNodeButton = new PanelButton("images/panel/add-button.png")
        this.buttons.push(addNodeButton)
        let selectNodeButton = new PanelButton("images/panel/add-button.png")
        this.buttons.push(selectNodeButton)
    }
    render() {
        ctx.fillStyle = 'silver';
        ctx.fillRect(0, 0, canvas.width, 64);

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].render(i);
        }

        //ctx.drawImage(img, 0, 0, 64, 64)
    }

    handleInput() {

    }
}

class PanelButton {
    constructor(imgSrc) {
        this.img = new Image();
        this.img.src = imgSrc;
    }

    render(index) {
        let positionX = index * 64

        if (ProgramManager.renderManager.isMouseInRect([positionX, 0,64, 64])) {
            ctx.fillStyle = 'gray';
        } else {
            ctx.fillStyle = 'silver';
        }

        ctx.fillRect(positionX, 0,64, 64);
        //ctx.drawImage(this.img, positionX, 0, 64, 64)
    }
}