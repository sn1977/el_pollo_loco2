class ThrowableObject extends MovableObject {
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    hasHitGround = false;
    isSplashing = false;

    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.throw();
        this.animateBottles();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setStoppableInterval(() => {
            if (!this.hasHitGround) {
                this.x += 10;
            }
            if (this.y >= 300 && !this.hasHitGround) {
                brokenGlass_sound.play();
                this.animateBottleSplash();
                this.hasHitGround = true; // Verhindert wiederholte Animationen
            }
        }, 25);
        // addInterval(intervalId);
    }

    animateBottles() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 25);
        // addInterval(animationIntervalId);
    }

    animateBottleSplash() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }, 25);
        // addInterval(animationIntervalId);
    }

    hitEndboss() {
        this.isSplashing = true;
        this.animateBottleSplash();
    }
}