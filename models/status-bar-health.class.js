/**
 * Represents a status bar for displaying the player's health in the game.
 * @extends DrawableObject
 */
class StatusBarHealth extends DrawableObject {

    /**
     * An array of image paths representing different health levels for the status bar.
     * The images indicate the health percentage in 20% increments.
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * The current health percentage of the player.
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructs a new StatusBarHealth instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
        this.x = 30;
        this.y = 40;
        this.height = 60;
        this.width = 220;
    }

    /**
     * Sets the current health percentage of the player and updates the displayed image.
     * @param {number} percentage - The current health percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES_HEALTH[this.resolveImagesHealthIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Resolves the index of the image to use based on the current health percentage.
     * @returns {number} - The index of the image to use.
     */
    resolveImagesHealthIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
