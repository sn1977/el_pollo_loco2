class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall!!!
            return true;
        } else {
            return this.y < 140;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    jumpOnEnemy(mo) {
        // Prüft, ob die Unterseite dieses Objekts sich über der Oberseite des Gegners befindet
        // und ob sich die Oberseite dieses Objekts unterhalb der Mitte des Gegners befindet
        let isAboveEnemyBottom = this.y + this.height < mo.y + mo.height;
        let isBelowEnemyMiddle = this.y > mo.y + mo.height / 2;

        // Prüft, ob die linke Seite dieses Objekts sich innerhalb der Breite des Gegners befindet
        let isWithinEnemyHorizontalBounds =
            this.x + this.width > mo.x &&
            this.x < mo.x + mo.width;

        return isAboveEnemyBottom && isBelowEnemyMiddle && isWithinEnemyHorizontalBounds;
    }

    isDead() {
        return this.energy === 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
}