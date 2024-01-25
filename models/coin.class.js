/**
 * Represents a coin object in the game.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    /**
     * Array of paths to the coin images for animation.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Object containing the offset values for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 55,
        left: 50,
        right: 50,
        bottom: 55
    };

    /**
     * Constructs a new Coin instance and its random position.
     */
    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 150 + Math.random() * 4000;
        this.y = 150 + Math.random() * 150;
        this.animate();
    }

    /**
     * Initiates the coin's animation.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}