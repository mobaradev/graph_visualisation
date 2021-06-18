class RenderManager {
    render() {
        this.clearCanvas();
        ProgramManager.scenes.main.render();
    }

    clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    isPointInRect(point, rect) {
        let pointX = point[0];
        let pointY = point[1];
        // rect as [x, y, width, height]
        let rectangle = {
            x: rect[0],
            y: rect[1],
            width: rect[2],
            height: rect[3]
        }
        if (pointX > rectangle.x && pointX < (rectangle.x + rectangle.width)) {
            if (pointY > rectangle.y && pointY < (rectangle.y + rectangle.height)) {
                return true;
            }
        }

        return false;
    }

    isMouseInRect(rect) {
        let mouseData = inputManager.mouse;

        return this.isPointInRect([mouseData.x, mouseData.y], rect);
    }
}