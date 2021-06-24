class InputManager {
    //mouse = {x: 0, y: 0};
    constructor() {
        this.mouse = {
            x: 0,
            y: 0,
            isPressed: false,
            wheelDirection: 0
        }
        this.keyboard = {
            W: false,
            A: false,
            S: false,
            D: false
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
        if (event.key === "W" || event.key === "w") {
            this.keyboard.W = true;
        } else if (event.key === "A" || event.key === "a") {
            this.keyboard.A = true;
        } else if (event.key === "S" || event.key === "s") {
            this.keyboard.S = true;
        } else if (event.key === "D" || event.key === "d") {
            this.keyboard.D = true;
        }
    }

    clearKeys() {
        this.mouse.isPressed = false;
        this.mouse.wheelDirection = null;

        this.keyboard = {
            W: false,
            A: false,
            S: false,
            D: false
        }
    }
}