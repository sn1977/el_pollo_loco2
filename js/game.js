let canvas;
let world;
let keyboard = new Keyboard();
let game_sound = new Audio('audio/gameMusic.mp3');
let brokenGlass_sound = new Audio('audio/brokenBottle.mp3');
let loosing_sound = new Audio('audio/loosingSound.wav');
let winning_sound = new Audio('audio/winningSound.wav');
let isGameStarted = false;
let isMuted = false;
let fullScreen = false;
let intervalIds = [];

/**
 * Initializes the game by setting up necessary event listeners and executing initial configuration functions.
 */
function init() {
    // Register an event listener to track window size changes
    window.addEventListener("resize", handlePhonePosition);
    mobileHud();
    window.addEventListener("resize", mobileHud);
}

/**
 * Handles keydown events for game controls.
 */
window.addEventListener('keydown', (event) => {
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

/**
 * Handles keydown events for game controls.
 */
window.addEventListener('keyup', (event) => {
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

/**
 * Sets up touch controls for mobile devices.
 */
function touchMobileIcons() {
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    }, {passive: false});
    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }, {passive: false});

    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    }, {passive: false});
    document.getElementById("btnRight").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, {passive: false});

    document.getElementById("btnJump").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    }, {passive: false});
    document.getElementById("btnJump").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    }, {passive: false});

    document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.KEY_D = true;
    }, {passive: false});
    document.getElementById("btnThrow").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.KEY_D = false;
    }, {passive: false});
}

/**
 * This function toggles the display of instruction screens based on the provided ID.
 * @param {string} id - The ID of the element to be toggled.
 */
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

/**
 * This function toggles the mute state of all game sounds.
 */
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

    toggleVisibilityIcons();
}

/**
 * This function toggles the visibility of mute and volume icons based on the current mute state.
 */
function toggleVisibilityIcons() {
    let muteIcon = document.getElementById('muteIcon');
    let volumeIcon = document.getElementById('volumeIcon');

    muteIcon.classList.toggle('d-none', isMuted);
    volumeIcon.classList.toggle('d-none', !isMuted);
}

/**
 * This function starts the game by initializing variables, setting up the canvas, and starting the game sound loop.
 */
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

    loopOfGameSound()
    touchMobileIcons();
    mobileHud();
}

/**
 * This function loops the background music for the game.
 */
function loopOfGameSound() {
    game_sound.currentTime = 0; // Reset the sound to the beginning
    game_sound.play();
    game_sound.loop = true;
}

/**
 * This function restarts the game from the beginning.
 */
function replayGame() {
    let lostScreen = document.getElementById('lostGame');
    let wonScreen = document.getElementById('wonGame');
    lostScreen.classList.add('d-none');
    wonScreen.classList.add('d-none');
    startGame();
    toggleMuteAllSounds();
}

/**
 * Handles the the end-of-game scenario when the player loses.
 */
function lostGame() {
    let lostScreen = document.getElementById('lostGame');
    lostScreen.classList.remove('d-none');
    toggleMuteAllSounds();
    loosing_sound.play();
    clearAllIntervals();
}

/**
 * Handles the end-of-game scenario when the player wins.
 */
function wonGame() {
    let wonScreen = document.getElementById('wonGame');
    wonScreen.classList.remove('d-none');
    toggleMuteAllSounds();
    winning_sound.play();
    clearAllIntervals();
}

/**
 * This function updates the fullscreen icons based on the current fullscreen state.
 */
function updateFullscreenIcons() {
    let enterFullscreen = document.getElementById('enterFullscreen');
    let exitFullscreen = document.getElementById('exitFullscreen');

    enterFullscreen.classList.toggle('d-none', fullScreen);
    exitFullscreen.classList.toggle('d-none', !fullScreen);
}

/**
 * This function enters fullscreen mode for the game.
 */
function enterFullscreen() {
    fullScreen = !fullScreen;
    let element = document.getElementById('canvas-wrapper');

    // Activate full screen mode
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE11
        element.msRequestFullscreen();
    }

    changeChronicalsFontcolor();
    updateFullscreenIcons();
    mobileHud();
}

/**
 * This function changes the font color of chronicles when entering fullscreen mode.
 */
function changeChronicalsFontcolor() {
    const chronicals = document.getElementById('chronicals');
    chronicals.style.color = 'wheat';
}

/**
 * This function exits fullscreen mode for the game.
 */
function closeFullscreen() {
    fullScreen = !fullScreen;

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }

    resetChronicalsFontcolor();
    updateFullscreenIcons();
    mobileHud();
}

/**
 * This function resets the font color of chronicles when exiting fullscreen mode.
 */
function resetChronicalsFontcolor() {
    const chronicals = document.getElementById('chronicals');
    chronicals.style.color = '';
}

/**
 * This function sets an interval with the given function and time, and stores the interval ID for future reference.
 * @param {Function} fn - The function to be executed.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * This function clears all intervals that have been stored in the intervalIds array.
 */
function clearAllIntervals() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

/**
 * This function toggles the HUD class based on screen width and orientation.
 */
function mobileHud() {
    // Überprüfen Sie, ob wir uns im mobilen Layout befinden
    if (window.innerWidth > window.innerHeight && window.innerWidth <= 955) {
        document.querySelector('h1').style.display = 'none';
        updateFullScreenStyle();
    } else {
        document.getElementById('hud').classList.add('d-none');
        document.querySelector('h1').style.display = 'block';
        resetFullScreenStyle();
    }
}

/**
 * This function updates the styles for fullscreen elements and displays the HUD container.
 */
function updateFullScreenStyle() {
    const fullScreenElement = document.getElementById('full-screen');
    const hudContainer = document.getElementById('hud');

    if (isGameStarted) {
        fullScreenElement.style.right = '0px';
        fullScreenElement.style.top = '8px';
        fullScreenElement.style.width = '100%';
        fullScreenElement.style.justifyContent = 'center';
        hudContainer.style.display = 'block';

        updateTouchBtns();
        updateScreenSoundBtns();
    }
}

/**
 * This function updates the styles of touch buttons.
 */
function updateTouchBtns() {
    const touchBtns = document.querySelectorAll('.control-button, .control-icons');
    touchBtns.forEach(touchBtn => {
        touchBtn.style.width = '40px';
        touchBtn.style.height = '40px';

        const img = touchBtn.querySelector('img');
        img.style.width = '28px'; // Größe des Bildes innerhalb des Buttons anpassen
        img.style.height = 'auto'; // Höhe automatisch anpassen, um das Seitenverhältnis beizubehalten
    });
}

/**
 * This function updates the styles of screen and sound buttons.
 */
function updateScreenSoundBtns() {
    const elements = document.querySelectorAll('#muteIcon, #volumeIcon, #enterFullscreen, #exitFullscreen');
    elements.forEach(element => {
        element.style.width = '20px';
        element.style.height = '20px';
    });
}

/**
 * This function resets the styles of the full-screen and HUD elements to their default values.
 * This function is typically called when exiting the mobile HUD layout or when
 * the game state changes in a way that requires a reset of these elements.
 * It also calls `resetTouchBtns` to reset the styles of touch buttons.
 */
function resetFullScreenStyle() {
    const fullScreenElement = document.getElementById('full-screen');
    const hudContainer = document.getElementById('hud');

    fullScreenElement.style.right = '';
    fullScreenElement.style.top = '';
    fullScreenElement.style.width = '';
    fullScreenElement.style.justifyContent = '';
    hudContainer.style.display = '';

    resetTouchBtns();
}

/**
 * This function reset the style of the touch-buttons and it's images
 */
function resetTouchBtns() {
    const touchBtns = document.querySelectorAll('.control-button, .control-icons');
    touchBtns.forEach(touchBtn => {
        touchBtn.style.width = '';
        touchBtn.style.height = '';

        const img = touchBtn.querySelector('img');
        if (img) {
            img.style.width = ''; // Setzen Sie die Größe des Bildes innerhalb des Buttons zurück
            img.style.height = ''; // Setzen Sie die Höhe des Bildes zurück
        }
    });
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

