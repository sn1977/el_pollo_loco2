/**
 * Represents a background object in the game.
 * Background objects are used to create the visual environment of the game.
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     */
    width = 720;

    /**
     * The height of the background object.
     */
    height = 480;

    /**
     * Constructs a new BackgroundObject.
     * @param {string} imagePath - The path to the image file for this background object.
     * @param {number} x - The x-coordinate where the background object will be placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // Position at the bottom of the canvas
    }
}
