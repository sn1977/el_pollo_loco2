let canvas;
let world;
let keyboard = new Keyboard();
let game_sound = new Audio('audio/gameMusic.mp3');
let brokenGlass_sound = new Audio('audio/brokenBottle.mp3');
let isGameStarted = false;
let isMuted = false;

function init() {

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

function touchMobileIcons() {
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById("btnRight").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById("btnJump").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById("btnJump").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.F = true;
    });
    document.getElementById("btnThrow").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.F = false;
    });
}

function toggleInstructions(id) {
    let element = document.getElementById(id);
    let startScreen = document.getElementById('start-screen');
    let gameControl = document.getElementById('game-control');

    if (element.classList.contains('d-none')) {
        element.classList.remove('d-none');
        element.style.display = "flex";
        startScreen.classList.add('d-none');
        gameControl.classList.add('d-none');
    } else {
        element.classList.add('d-none');
        element.style.display = "none";
        startScreen.classList.remove('d-none');
        gameControl.classList.remove('d-none');
    }
}

function toggleMuteAllSounds() {
    isMuted = !isMuted;
    world.pain_sound.muted = isMuted;
    world.collectingBottle_sound.muted = isMuted;
    world.collectingCoin_sound.muted = isMuted;
    world.chickenDead_sound.muted = isMuted;
    world.smallChickenDead_sound.muted = isMuted;
    world.character.walking_sound.muted = isMuted;
    world.character.jumping_sound.muted = isMuted;
    world.character.sleeping_sound.muted = isMuted;
    brokenGlass_sound.muted = isMuted;
    game_sound.muted = isMuted;

    // Umschalten der Sichtbarkeit der Icons
    let muteIcon = document.getElementById('muteIcon');
    let volumeIcon = document.getElementById('volumeIcon');

    if (isMuted) {
        muteIcon.classList.add('d-none');
        volumeIcon.classList.remove('d-none');
    } else {
        muteIcon.classList.remove('d-none');
        volumeIcon.classList.add('d-none');
    }
}

function startGame() {
    isGameStarted = true;
    let startScreen = document.getElementById('start-screen');
    let gameControl = document.getElementById('game-control');
    let muteIcon = document.getElementById('muteIcon');

    startScreen.classList.add('d-none');
    gameControl.classList.add('d-none');
    muteIcon.classList.remove('d-none');

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    game_sound.play();
    game_sound.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
}

function lostGame() {
    let lostScreen = document.getElementById('lostGame');
    lostScreen.classList.remove('d-none');
}

function wonGame() {
    let wonScreen = document.getElementById('wonGame');
    wonScreen.classList.remove('d-none');
}

function enterFullscreen() {
    let element;

    // Überprüfen des Spielstatus, um das Ziel für den Vollbildmodus zu bestimmen
    if (isGameStarted) {
        element = document.getElementById('canvas'); // Spiel läuft, verwenden Sie das Canvas
    } else {
        element = document.getElementById('canvas-wrapper'); // Spiel ist im Startbildschirm oder pausiert, verwenden Sie den Wrapper
    }

    // Vollbildmodus aktivieren
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE11
        element.msRequestFullscreen();
    }
}

// function closeFullscreen() {
//     if (document.exitFullscreen) {
//         document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) { /* Safari */
//         document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) { /* IE11 */
//         document.msExitFullscreen();
//     }
// }