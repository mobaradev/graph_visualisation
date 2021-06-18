class Panel {
    render() {
        ctx.fillStyle = 'silver';
        ctx.fillRect(0, 0, canvas.width, 60);

        // add button
        let img = new Image();
        img.src = "images/panel/add-button.png"

        ctx.drawImage(img, 0, 0, 64, 64)
    }

    handleInput() {

    }
}

class PanelButton {

}