let canvas;
let world;
let keyboard = new Keyboard();
let game_sound = new Audio('audio/gameMusic.mp3');
let brokenGlass_sound = new Audio('audio/brokenBottle.mp3');
let isGameStarted = false;
let isMuted = false;
let fullScreen = false;

// Globale Variable für Intervall-IDs
let intervalIds = [];

function init() {
    // ... Ihre bestehenden init-Codes
    mobileHud(); // Rufen Sie diese Funktion hier auf
    window.addEventListener("resize", mobileHud); // Fügt den Listener hinzu
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
        keyboard.KEY_D = true;
    });
    document.getElementById("btnThrow").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.KEY_D = false;
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
    let volumeIcon = document.getElementById('volumeIcon');

    startScreen.classList.add('d-none');
    gameControl.classList.add('d-none');
    muteIcon.classList.remove('d-none');
    volumeIcon.classList.add('d-none');

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    game_sound.currentTime = 0; // Setzen Sie den Sound auf den Anfang zurück
    game_sound.play();
    game_sound.loop = true; // Stellen Sie sicher, dass der Sound wiederholt wird

    touchMobileIcons();
    mobileHud();
}

function replayGame() {
    let lostScreen = document.getElementById('lostGame');
    let wonScreen = document.getElementById('wonGame');
    lostScreen.classList.add('d-none');
    wonScreen.classList.add('d-none');
    startGame();
    toggleMuteAllSounds();
}

function lostGame() {
    let lostScreen = document.getElementById('lostGame');
    lostScreen.classList.remove('d-none');
    toggleMuteAllSounds();
    clearAllIntervals();
}

function wonGame() {
    let wonScreen = document.getElementById('wonGame');
    wonScreen.classList.remove('d-none');
    toggleMuteAllSounds();
    clearAllIntervals();
}

function updateFullscreenIcons() {
    let enterFullscreen = document.getElementById('enterFullscreen');
    let exitFullscreen = document.getElementById('exitFullscreen');

    if (fullScreen) {
        enterFullscreen.classList.add('d-none');
        exitFullscreen.classList.remove('d-none');
    } else {
        enterFullscreen.classList.remove('d-none');
        exitFullscreen.classList.add('d-none');
    }
}

function enterFullscreen() {
    fullScreen = !fullScreen;
    let element = document.getElementById('canvas-wrapper'); // Spiel ist im Startbildschirm oder pausiert, verwenden Sie den Wrapper

    // Vollbildmodus aktivieren
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE11
        element.msRequestFullscreen();
    }

    updateFullscreenIcons();
    mobileHud();
}

function closeFullscreen() {
    fullScreen = !fullScreen;

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }

    // Umschalten der Sichtbarkeit der Icons
    updateFullscreenIcons();
    mobileHud();
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

// Funktion, um alle Intervalle zu beenden
function clearAllIntervals() {
    intervalIds.forEach(clearInterval);
    intervalIds = []; // Setzt das Array zurück
}

/**
 * This function toggles the HUD class based on screen width and orientation.
 */
function mobileHud() {
    // Überprüfen Sie, ob wir uns im mobilen Layout befinden
    if (window.innerWidth > window.innerHeight && window.innerWidth <= 955) {
        document.querySelector('h1').style.display = 'none';
        updateFullScreenStyle(); // Aktualisieren Sie den Stil von #full-screen
    } else {
        document.getElementById('hud').classList.add('d-none');
        document.querySelector('h1').style.display = 'block';
        // Setzen Sie den #full-screen-Stil auf Standard zurück
        resetFullScreenStyle();
    }
}

function updateFullScreenStyle() {
    const fullScreenElement = document.getElementById('full-screen');
    const hudContainer = document.getElementById('hud');
    const panelWrappers = document.querySelectorAll('.panel-wrapper');
    const touchBtns = document.querySelectorAll('.control-button');

    if (isGameStarted) {
        fullScreenElement.style.right = fullScreen ? '36px' : '-82px';
        fullScreenElement.style.top = '8px';
        fullScreenElement.style.flexDirection = 'column';
        hudContainer.style.display = 'block';
        hudContainer.style.bottom = '8px';

        // Setzen des Stils für jedes Element in panelWrappers
        panelWrappers.forEach(wrapper => {
            wrapper.style.margin = '5px';
            wrapper.style.gap = '8px';
        });

        touchBtns.forEach(touchBtn => {
            touchBtn.style.width = '60px';
            touchBtn.style.height = '60px';
        });

        // Update touch button sizes only when not in full-screen mode
        if (!fullScreen) {
            touchBtns.forEach(touchBtn => {
                touchBtn.style.width = '40px';
                touchBtn.style.height = '40px';

                const img = touchBtn.querySelector('img');
                if (img) {
                    img.style.width = '28px'; // Größe des Bildes innerhalb des Buttons anpassen
                    img.style.height = 'auto'; // Höhe automatisch anpassen, um das Seitenverhältnis beizubehalten
                }
            });
        }
    } else {
        fullScreenElement.style.right = '8px';
        fullScreenElement.style.top = '8px';

    }
}

function resetFullScreenStyle() {
    const fullScreenElement = document.getElementById('full-screen');
    fullScreenElement.style.right = '';
    fullScreenElement.style.top = '';
    fullScreenElement.style.flexDirection = '';
}

/**
 * This function toggles the visibility of a mobile mode element based on screen width and orientation.
 */
function handlePhonePosition() {
    if (window.innerWidth < 1000 && window.matchMedia("(orientation: portrait)").matches) {
        document.getElementById("smartpohneModus").classList.remove("d-none");
    } else {
        document.getElementById("smartpohneModus").classList.add("d-none");
    }
}
// Register an event listener to track window size changes
window.addEventListener("resize", handlePhonePosition);
