class InputManager {
    //mouse = {x: 0, y: 0};
    constructor() {
        this.mouse = {
            x: 0,
            y: 0,
            isPressed: false
        }
    }

    handleMouseEvent(event) {
        this.mouse.x = event.pageX;
        this.mouse.y = event.pageY;

    }

    handleMouseClick() {
        this.mouse.isPressed = true;
    }

    handleKeyPress(event) {
        console.log("test")
        console.log(event)
        //this.mouse.isPr
    }

    clearKeys() {
        this.mouse.isPressed = false;
    }
}