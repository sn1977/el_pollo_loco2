/**
 * Represents a bottle in the game.
 * Bottles are collectible items that can be found and interacted with in the game world.
 */
class Bottle extends MovableObject {
    /**
     * Array of images for the bottle's rotation animation.
     */
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Offset values to adjust the bottle's position.
     */
    offset = {
        top: 10,
        left: 25,
        right: 25,
        bottom: 10
    };

    /**
     * Constructs a new Bottle object.
     * Initializes its properties and starts its animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.height = 80;
        this.width = 70;
        this.x = 150 + Math.random() * 4000; // Random horizontal position
        this.y = 480 - this.height * 1.6; // Position near the bottom of the canvas
        this.animate();
    }

    /**
     * Starts the bottle's rotation animation.
     * Changes the displayed image at regular intervals.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 200);
    }
}
