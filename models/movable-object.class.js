/**
 * Represents a movable object in the game.
 * Extends the DrawableObject class.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;            // Horizontal movement speed
    otherDirection = false;  // Indicates if the object is facing the opposite direction
    speedY = 0;             // Vertical speed (for jumping/falling)
    acceleration = 2.5;     // Acceleration due to gravity
    energy = 100;           // Energy level of the object
    lastHit = 0;            // Timestamp of the last hit taken by the object

    /**
     * Applies gravity to the movable object, making it fall when above ground.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - True if above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall!!!
            return true;
        } else {
            return this.y < 140;
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays the animation for the movable object.
     * @param {array} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Makes the object jump by applying a vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Checks if the object is falling.
     * @returns {boolean} - True if falling, false otherwise.
     */
    isFalling() {
        return this.speedY < 0;
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check for collision with.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Decreases the energy of the object when hit.
     * If energy reaches 0, the object is considered dead.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean} - True if dead, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if the object is hurt based on the time since the last hit.
     * @returns {boolean} - True if hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
}
