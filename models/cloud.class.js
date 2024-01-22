class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 500;
    speed = 2;

    constructor(xPosition) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.y = 20 + Math.random() * 40;
        this.x = xPosition;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 50);
        // addInterval(movementIntervalId);
    }
}