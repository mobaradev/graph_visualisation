class InputManager {
    //mouse = {x: 0, y: 0};
    constructor() {
        this.mouse = {
            x: 0,
            y: 0,
            isPressed: false,
            wheelDirection: 0
        }
    }

    handleMouseEvent(event) {
        if (event.type === "mousemove") {
            this.mouse.x = event.pageX;
            this.mouse.y = event.pageY;
        }  else if (event.type === "wheel") {
            console.log(event.deltaY)
            if (event.deltaY > 0) {
                this.mouse.wheelDirection = "down";
            } else {
                this.mouse.wheelDirection = "up";
            }
        }
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
        this.mouse.wheelDirection = null;
    }
}