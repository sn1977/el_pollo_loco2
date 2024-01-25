/**
 * Represents the status bar for bottles in the game.
 * Extends the DrawableObject class.
 */
class StatusBarBottle extends DrawableObject {
    /**
     * An array of image paths representing different bottle fill levels for the status bar.
     * The images indicate the bottle fill percentage in 20% increments.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * The current amount of bottles in the status bar.
     * @type {number}
     */
    amountBottles = 0;

    /**
     * Constructs a new StatusBarBottle instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.setAmountBottles(0);
        this.x = 30;
        this.y = 0;
        this.height = 60;
        this.width = 220;
    }

    /**
     * Sets the amount of bottles in the status bar and updates the displayed image.
     * @param {number} amountBottles - The new amount of bottles.
     */
    setAmountBottles(amountBottles) {
        this.amountBottles = amountBottles;
        let imagePath = this.IMAGES_BOTTLE[this.resolveImagesBottleIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Collects a bottle, incrementing the bottle count.
     */
    collectBottle() {
        this.amountBottles += 1;
    }

    /**
     * Resolves the index of the image to display based on the current bottle count.
     * @returns {number} - The index of the image in IMAGES_BOTTLE array.
     */
    resolveImagesBottleIndex() {
        if (this.amountBottles >= 10) {
            return 5;
        } else if (this.amountBottles >= 8) {
            return 4;
        } else if (this.amountBottles >= 6) {
            return 3;
        } else if (this.amountBottles >= 4) {
            return 2;
        } else if (this.amountBottles >= 2) {
            return 1;
        } else {
            return 0;
        }
    }
}
