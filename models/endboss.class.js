class Endboss extends MovableObject {
    y = 25;
    height = 430;
    width = 330;
    firstContact = false;

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
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G24.png'
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
        this.speed = 0.15 + 0.5;
        this.x = 4600;

        // this.firstContactToEndboss();
        this.animate();
    }

    distanceToEndboss(distance) {
        return Math.abs(this.x - this.world.character.x) < distance;
    }

    update() {
        if (this.world) {
            const characterX = this.world.character.x;
            const distanceToCharacter = this.x - characterX;

            if (Math.abs(distanceToCharacter) < 400) { // Verfolgt den Charakter, wenn er weniger als 400px entfernt ist
                if (distanceToCharacter > 0) { // Wenn der Endboss rechts vom Charakter ist
                    this.moveLeft();
                }
            }
        }
    }

    chasingCharacter() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }, 200);
    }

    animate() {
        setInterval(() => {
            if (this.world && this.distanceToEndboss(450) && !this.firstContact) {
                this.playAnimation(this.IMAGES_ALERT);
                setTimeout(() => {
                    this.playAnimation(this.IMAGES_WALKING);
                }, 3000);
                this.chasingCharacter();
            } else if (this.firstContact === true) {
                // Optional: Andere Logik, wenn der erste Kontakt bereits stattgefunden hat
            }
        }, 200);

    }
}