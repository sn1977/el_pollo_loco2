/**
 * Represents a cloud in the game's background.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
     * Y-coordinate of the cloud.
     * @type {number}
     */
    y = 20;

    /**
     * Height of the cloud.
     * @type {number}
     */
    height = 300;

    /**
     * Width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * Speed at which the cloud moves.
     * @type {number}
     */
    speed = 2;

    /**
     * Constructs a new Cloud instance with a specified X position.
     * @param {number} xPosition - The X-coordinate for the cloud.
     */
    constructor(xPosition) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.y = 20 + Math.random() * 40;
        this.x = xPosition;
        this.animate();
    }

    /**
     * Initiates the cloud's animation.
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 50);
    }
}