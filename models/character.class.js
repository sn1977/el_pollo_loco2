/**
 * Represents the main character of the game.
 */
class Character extends MovableObject {
    /**
     * Height of the character.
     * @type {number}
     */
    height = 300;


    /**
     * Array of images for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of images for the jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array of images for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of images for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Array of images for the idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Array of images for the long idle animation.
     * @type {string[]}
     */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Reference to the game world.
     * @type {World}
     */
    world;

    /**
     * Speed of the character.
     * @type {number}
     */
    speed = 10;

    /**
     * Counter for determining when the character goes to sleep.
     * @type {number}
     */
    goToSleep = 0;

    /**
     * Sound played when walking.
     * @type {Audio}
     */
    walking_sound = new Audio('audio/walking.mp3');

    /**
     * Sound played when jumping.
     * @type {Audio}
     */
    jumping_sound = new Audio('audio/jump.mp3');

    /**
     * Sound played when sleeping.
     * @type {Audio}
     */
    sleeping_sound = new Audio('audio/snoring.mp3');

    /**
     * Object defining the character's hitbox offset.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 130,
        left: 30,
        right: 40,
        bottom: 15
    };

    /**
     * Constructs a new Character instance with initial settings.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Manages the character's sleeping state and plays the corresponding animation.
     */
    characterSleep() {
        if (this.goToSleep < 5) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.sleeping_sound.play();
        }
    }

    /**
     * Initiates the animation processes for the character.
     */
    animate() {
        this.startMovementAnimation();
        this.startStatusAnimation();
        this.startSleepAnimation();
    }

    /**
     * Starts the movement related animations for the character.
     */
    startMovementAnimation() {
        setStoppableInterval(() => {
            this.handleMovement();
        }, 1000 / 60);
    }

    /**
     * Handles the movement logic for the character.
     */
    handleMovement() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSound();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround() || this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.jumping_sound.play();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Plays walking sound for the character.
     */
    playWalkingSound() {
        this.goToSleep = 0;
        this.sleeping_sound.pause();
        this.walking_sound.play();
    }

    /**
     * Starts the status-related animations for the character.
     */
    startStatusAnimation() {
        setStoppableInterval(() => {
            this.handleStatus();
        }, 50);
    }

    /**
     * Handles the status animations for the character.
     */
    handleStatus() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.resetGoToSleep();
        } else if (this.isDead()) {
            this.handleDeath();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.resetGoToSleep();
        } else {
            if (this.isMoving()) {
                this.playAnimation(this.IMAGES_WALKING);
                this.resetGoToSleep();
            }
        }
    }

    /**
     * Manages the character's death process and triggers the lost game scenario.
     */
    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        lostGame();
        this.resetGoToSleep();
    }

    /**
     * Checks if the character is moving either to the left or right.
     * @returns {boolean} True if the character is moving.
     */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Resets the goToSleep counter to 0.
     */
    resetGoToSleep() {
        this.goToSleep = 0;
    }

    /**
     * Starts the sleep animation for the character.
     */
    startSleepAnimation() {
        setStoppableInterval(() => {
            this.goToSleep += 1;
            this.characterSleep();
        }, 1000);
    }
}