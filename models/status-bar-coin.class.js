/**
 * Represents a status bar for collecting coins in the game.
 * @extends DrawableObject
 */
class StatusBarCoin extends DrawableObject {

    /**
     * An array of image paths representing different coin fill levels for the status bar.
     * The images indicate the coin fill percentage in 20% increments.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * The current amount of coins in the status bar.
     * @type {number}
     */
    amountCoins = 0;

    /**
     * Constructs a new StatusBarCoin instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.setAmountCoins(0);
        this.x = 30;
        this.y = 80;
        this.height = 60;
        this.width = 220;
    }

    /**
     * Sets the current amount of coins in the status bar and updates the displayed image.
     * @param {number} amountCoins - The current amount of coins to set.
     */
    setAmountCoins(amountCoins) {
        this.amountCoins = amountCoins;
        let imagePath = this.IMAGES_COIN[this.resolveImagesCoinIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Increments the current amount of coins in the status bar by 1.
     */
    collectCoins() {
        this.amountCoins += 1;
    }

    /**
     * Resolves the index of the image to use based on the current amount of coins.
     * @returns {number} - The index of the image to use.
     */
    resolveImagesCoinIndex() {
        if (this.amountCoins >= 10) {
            return 5;
        } else if (this.amountCoins > 8) {
            return 4;
        } else if (this.amountCoins > 6) {
            return 3;
        } else if (this.amountCoins > 4) {
            return 2;
        } else if (this.amountCoins > 2) {
            return 1;
        } else {
            return 0;
        }
    }
}
