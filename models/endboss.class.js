/**
 * Represents the endboss in the game.
 */
class Endboss extends MovableObject {
    /**
     * Y-coordinate of the endboss.
     * @type {number}
     */
    y = 25;

    /**
     * Height of the endboss.
     * @type {number}
     */
    height = 430;

    /**
     * Width of the endboss.
     * @type {number}
     */
    width = 330;

    /**
     * Energy level of the endboss.
     * @type {number}
     */
    energy = 50;

    /**
     * Whether the endboss is dead.
     * @type {boolean}
     */
    isDead = false;

    /**
     * Whether the endboss has had first contact with the character.
     * @type {boolean}
     */
    firstContact = false;

    /**
     * Counter variable used in animations.
     * @type {number}
     */
    i = 0;

    /**
     * Array holding the image paths for walking animation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array holding the image paths for alert animation
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array holding the image paths for attack animation
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Array holding the image paths for hurt animation
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Array holding the image paths for dead animation
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Constructs a new Endboss instance.
     * @param {World} world - The world in which the endboss exists.
     */
    constructor(world) {
        super();
        // Load images and set initial settings
        this.world = world;
        this.loadImage(this.IMAGES_WALKING[3]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 5;
        this.x = 4600;
        this.animate();
    }

    /**
     * Checks the distance to the endboss.
     * @param {number} distance - The distance to check.
     * @returns {boolean} True if within distance.
     */
    distanceToEndboss(distance) {
        return Math.abs(this.x - this.world.character.x) < distance;
    }

    /**
     * Selects and plays the appropriate animation based on the current state.
     */
    selectAnimation() {
        if (this.i < 10) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_ATTACK);
        }
        this.i++;
    }

    /**
     * Moves the endboss towards the character based on their positions.
     */
    moveTowardsCharacter() {
        if (this.world.character.x < 4150 && !this.firstContact) {
            this.i = 0;
            this.firstContact = true;
        }

        if (this.x - this.world.character.x > 0) { // If the endboss is to the right of the character
            this.moveLeft();
            this.otherDirection = false; // Mirror image
        } else {
            this.moveRight();
            this.otherDirection = true; // Do not mirror image
        }
    }

    /**
     * Controls the behavior when chasing the character.
     */
    chasingCharacter() {
        if (this.world && this.distanceToEndboss(400)) {
            this.selectAnimation();
            this.moveTowardsCharacter();
        }
    }


    /**
     * Animates the endboss, including walking, attacking, and dying.
     */
    animate() {
        setStoppableInterval(() => {
            if (this.energy === 0) {
                this.isDead = true;
                wonGame();
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.world && this.distanceToEndboss(450) && !this.distanceToEndboss(400) && !this.isDead) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (!this.isDead) {
                this.chasingCharacter();
            }
        }, 100);
    }
}