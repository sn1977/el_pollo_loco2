/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    /**
     * X-coordinate of the drawable object.
     * @type {number}
     */
    x = 120;

    /**
     * Y-coordinate of the drawable object.
     * @type {number}
     */
    y = 50;

    /**
     * Height of the drawable object.
     * @type {number}
     */
    height = 150;

    /**
     * Width of the drawable object.
     * @type {number}
     */
    width = 140;

    /**
     * Image object for the drawable.
     * @type {Image}
     */
    img;

    /**
     * Cache for preloaded images.
     * @type {Object}
     */
    imageCache = {};

    /**
     * Index of the currently displayed image.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Offset for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Loads an image from a given path.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads a set of images.
     * @param {string[]} arr - Array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * Draws the object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading img', e);
            console.log('Could not load image', this.img.src);
        }

    }
}