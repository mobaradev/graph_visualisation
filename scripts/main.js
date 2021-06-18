const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width  = 1024;
canvas.height = 600;

inputManager = new InputManager();
//inputManager.mouse = {x: 0, y: 0};
const ProgramManager = {
    scenes: {
        main: new Main()
    },
    renderManager: new RenderManager()
}
//ProgramManager.graph = new Graph();

canvas.addEventListener("mousemove", (event) => inputManager.handleMouseEvent(event), false);
canvas.addEventListener("click", () => inputManager.handleMouseClick())
document.addEventListener("keypress", (event) => inputManager.handleKeyPress(event), false);

setInterval(() => {
    //RenderManager.render()
    ProgramManager.scenes.main.handle();

    inputManager.clearKeys();
}, 50)