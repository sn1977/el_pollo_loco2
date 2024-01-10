let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
}

window.addEventListener('keydown', (event) => {
    // console.log(event);
    if (event.keyCode === 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode === 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode === 38) {
        keyboard.UP = true;
    }
    if (event.keyCode === 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode === 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode === 68) {
        keyboard.KEY_D = true;
    }
    if (event.keyCode === 70) {
        keyboard.KEY_F = true;
    }
});

window.addEventListener('keyup', (event) => {
    // console.log(event);
    if (event.keyCode === 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode === 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode === 38) {
        keyboard.UP = false;
    }
    if (event.keyCode === 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode === 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode === 68) {
        keyboard.KEY_D = false;
    }
    if (event.keyCode === 70) {
        keyboard.KEY_F = false;
    }
});

