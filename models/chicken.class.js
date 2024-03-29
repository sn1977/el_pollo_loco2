/**
 * Represents a chicken enemy in the game.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /**
     * Y-coordinate of the chicken.
     * @type {number}
     */
    y = 350;

    /**
     * Height of the chicken.
     * @type {number}
     */
    height = 80;
    /**
     * Width of the chicken.
     * @type {number}
     */
    width = 80;

    /**
     * Flag indicating whether the chicken is dead.
     * @type {boolean}
     */
    isDead = false;

    /**
     * Array of images for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Array of images for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Constructs a new Chicken instance with initial settings.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 350 + Math.random() * 4000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Initiates the chicken's animations.
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}