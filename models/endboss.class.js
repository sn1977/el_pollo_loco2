class Endboss extends MovableObject {
    y = 25;
    height = 430;
    width = 330;
    energy = 30;
    isDead = false;
    firstContact = false;
    i = 0;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(world) {
        super();
        this.world = world;
        this.loadImage(this.IMAGES_WALKING[3]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 5;
        this.x = 4600;
        this.animate();
    }

    distanceToEndboss(distance) {
        return Math.abs(this.x - this.world.character.x) < distance;
    }

    chasingCharacter() {
        if (this.world && this.distanceToEndboss(400)) {
            if (this.i < 10) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ATTACK);
            }
            this.i++;
            if (this.world.character.x < 4150 && !this.firstContact) {
                this.i = 0;
                this.firstContact = true;
            }

            if (this.x - this.world.character.x > 0) { // Wenn der Endboss rechts vom Charakter ist
                this.moveLeft();
                this.otherDirection = false; // Bild spiegeln
            } else {
                this.moveRight();
                this.otherDirection = true; // Bild nicht spiegeln
            }
        }
    }

    animate() {
        setStoppableInterval(() => {
            if (this.energy === 0) {
                this.isDead = true;
                wonGame();
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.world && this.distanceToEndboss(450) && !this.distanceToEndboss(400) && !this.isDead) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (!this.isDead) {
                this.chasingCharacter();
            }
        }, 200);
        // addInterval(intervalId);
    }
}