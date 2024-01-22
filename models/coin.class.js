class Coin extends MovableObject {
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 55,
        left: 50,
        right: 50,
        bottom: 55
    };

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 150 + Math.random() * 4000;
        this.y = 150 + Math.random() * 150;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
        // addInterval(intervalId);
    }
}