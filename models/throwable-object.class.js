/**
 * Represents a throwable object in the game, such as a salsa bottle.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * An array of image paths representing the rotation animation of the throwable object.
     * @type {string[]}
     */
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * An array of image paths representing the splash animation when the throwable object hits the ground.
     * @type {string[]}
     */
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * A flag indicating whether the throwable object has hit the ground.
     * @type {boolean}
     */
    hasHitGround = false;

    /**
     * A flag indicating whether the throwable object is currently splashing on the ground.
     * @type {boolean}
     */
    isSplashing = false;

    /**
     * Constructs a new ThrowableObject instance at the specified position.
     * @param {number} x - The x-coordinate of the throwable object's position.
     * @param {number} y - The y-coordinate of the throwable object's position.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.throw();
        this.animateBottles();
    }

    /**
     * Throws the throwable object, initiating its animation and applying gravity.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setStoppableInterval(() => {
            if (!this.hasHitGround) {
                this.x += 10;
            }
            if (this.y >= 300 && !this.hasHitGround) {
                brokenGlass_sound.play();
                this.animateBottleSplash();
                this.hasHitGround = true;
            }
        }, 25);
    }

    /**
     * Animates the rotation of the throwable object.
     */
    animateBottles() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 25);
    }

    /**
     * Animates the splash of the throwable object when it hits the ground.
     */
    animateBottleSplash() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }, 25);
    }

    /**
     * Triggers the splash animation when the throwable object hits the endboss.
     */
    hitEndboss() {
        this.isSplashing = true;
        this.animateBottleSplash();
    }
}
