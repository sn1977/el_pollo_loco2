class StatusBarEndboss extends DrawableObject {
    IMAGES_STATUSBAR_ENDBOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        this.setPercentage(50);
        this.x = 470;
        this.y = 0;
        this.height = 60;
        this.width = 220;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImagesHealthIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImagesHealthIndex() {
        if (this.percentage === 50) {
            return 5;
        } else if (this.percentage > 40) {
            return 4;
        } else if (this.percentage > 30) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 10) {
            return 1;
        } else {
            return 0;
        }
    }
}