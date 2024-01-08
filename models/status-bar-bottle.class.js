class StatusBarBottle extends DrawableObject {
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    amountBottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.setAmountBottles(0);
        this.x = 30;
        this.y = 0;
        this.height = 60;
        this.width = 220;
    }

    setAmountBottles(amountBottles) {
        this.amountBottles = amountBottles;
        let imagePath = this.IMAGES_BOTTLE[this.resolveImagesBottleIndex()];
        this.img = this.imageCache[imagePath];
    }

    collectBottle() {
        this.amountBottles += 1;
    }

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