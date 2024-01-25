/**
 * Represents the game world containing various game elements and logic.
 */
class World {
    // Game elements
    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndBoss = new StatusBarEndboss();
    level;

    // Canvas and input
    canvas;
    keyboard;
    ctx;
    camera_x = 0;

    // Lists of game objects
    throwableObjects = [];

    // Attribute to manage bottle throwing cooldown
    lastBottleThrowTime = 0;

    // Audio elements
    pain_sound = new Audio('audio/pain.mp3');
    collectingBottle_sound = new Audio('audio/collectingBottle.mp3');
    collectingCoin_sound = new Audio('audio/collectingCoin.mp3');
    chickenDead_sound = new Audio('audio/chickenDead.mp3');
    smallChickenDead_sound = new Audio('audio/smallChickenDead.mp3');

    /**
     * Creates a new game world with the specified canvas and keyboard input.
     * @param {HTMLCanvasElement} canvas - The game canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = createLevel1(this); // Creating the level using the World reference
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop.
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsBottles();
            this.checkCollisionsCoins();
            this.refillHealth();
            this.checkBottleOnEnemy();
        }, 1000 / 60);
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead && !this.character.isHurt()) {
                if (this.character.isAboveGround()) {
                    this.checkJumpingOnEnemy();
                } else {
                    this.character.hit();
                    this.pain_sound.play();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks for collisions between the character and bottles.
     */
    checkCollisionsBottles() {
        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            let bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle)) {
                this.collectingBottle_sound.play();
                this.statusBarBottle.collectBottle();
                this.statusBarBottle.setAmountBottles(this.statusBarBottle.amountBottles);
                this.level.bottles.splice(i, 1);
            }
        }
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCollisionsCoins() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            let coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.collectingCoin_sound.play();
                this.statusBarCoin.collectCoins();
                this.statusBarCoin.setAmountCoins(this.statusBarCoin.amountCoins);
                this.level.coins.splice(i, 1);
            }
        }
    }

    /**
     * Checks if throwable objects hit enemies and handles the interactions.
     */
    checkBottleOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                this.handleBottleCollision(bottle, enemy);
            });
        });
    }

    /**
     * Handles the collision between a bottle and an enemy.
     * @param {ThrowableObject} bottle - The throwable object.
     * @param {Enemy} enemy - The enemy object.
     */
    handleBottleCollision(bottle, enemy) {
        if (bottle.isColliding(enemy)) {
            if (enemy instanceof Chicken) {
                this.handleChickenCollision(bottle, enemy);
            } else if (enemy instanceof ChickenSmall) {
                this.handleChickenSmallCollision(bottle, enemy);
            } else if (enemy instanceof Endboss && !enemy.isHurt()) {
                this.handleEndbossCollision(bottle, enemy);
            }

            // Remove the bottle once the splash animation is complete
            if (!bottle.isSplashing) {
                this.removeBottleAfterCollision(bottle);
            }
        }
    }

    /**
     * Handles the collision between a bottle and a Chicken enemy.
     * @param {ThrowableObject} bottle - The throwable object.
     * @param {Chicken} chicken - The Chicken enemy.
     */
    handleChickenCollision(bottle, chicken) {
        chicken.isDead = true;
        this.chickenDead_sound.play();
        this.removeEnemyAfterDelay(chicken);
    }

    /**
     * Handles the collision between a bottle and a ChickenSmall enemy.
     * @param {ThrowableObject} bottle - The throwable object.
     * @param {ChickenSmall} chickenSmall - The ChickenSmall enemy.
     */
    handleChickenSmallCollision(bottle, chickenSmall) {
        chickenSmall.isDead = true;
        this.smallChickenDead_sound.play();
        this.removeEnemyAfterDelay(chickenSmall);
    }

    /**
     * Handles the collision between a bottle and an Endboss enemy.
     * @param {ThrowableObject} bottle - The throwable object.
     * @param {Endboss} endboss - The Endboss enemy.
     */
    handleEndbossCollision(bottle, endboss) {
        endboss.hit();
        this.statusBarEndBoss.setPercentage(endboss.energy);
        bottle.hitEndboss();
        endboss.playAnimation(endboss.IMAGES_HURT);
    }

    /**
     * Removes a bottle from the throwableObjects list after collision.
     * @param {ThrowableObject} bottle - The throwable object to be removed.
     */
    removeBottleAfterCollision(bottle) {
        const bottleIndex = this.throwableObjects.indexOf(bottle);
        if (bottleIndex > -1) {
            this.throwableObjects.splice(bottleIndex, 1);
        }
    }

    /**
     * Checks if the character jumps on top of enemies.
     */
    checkJumpingOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.isFalling()) {
                if (enemy instanceof Chicken) {
                    enemy.isDead = true;
                    this.chickenDead_sound.play();
                    this.removeEnemyAfterDelay(enemy);
                } else if (enemy instanceof ChickenSmall) {
                    enemy.isDead = true;
                    this.smallChickenDead_sound.play();
                    this.removeEnemyAfterDelay(enemy);
                }
            }
        });
    }

    /**
     * Removes an enemy from the level after a delay.
     * @param {Enemy} enemy - The enemy to be removed.
     */
    removeEnemyAfterDelay(enemy) {
        setTimeout(() => {
            const enemyIndex = this.level.enemies.indexOf(enemy);
            if (enemyIndex > -1) {
                this.level.enemies.splice(enemyIndex, 1); // Removing the enemy at the index location found
            }
        }, 300);
    }

    /**
     * Checks if the character can throw a bottle and manages bottle throwing.
     * This method ensures that there is a cooldown between bottle throws.
     */
    checkThrowObjects() {
        // Check if the "D" key is pressed, the character has bottles in inventory, and if enough time has passed since the last bottle throw
        if (this.keyboard.KEY_D && this.statusBarBottle.amountBottles > 0 && Date.now() - this.lastBottleThrowTime >= 1000) {
            // Creates a new ThrowableObject at the current position of the character
            let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.amountBottles -= 1;
            this.statusBarBottle.setAmountBottles(this.statusBarBottle.amountBottles);

            // Update the timestamp of the last bottle throw
            this.lastBottleThrowTime = Date.now();
        }
    }

    /**
     * Refills the character's health using coins.
     */
    refillHealth() {
        if (this.keyboard.KEY_F && this.statusBarCoin.amountCoins > 0) {
            this.statusBarCoin.amountCoins -= 1;
            this.character.energy += 5;
            this.statusBarCoin.setAmountCoins(this.statusBarCoin.amountCoins);
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    /**
     * Draws the game world and its elements.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Moves the canvas to simulate camera movement
        this.ctx.translate(this.camera_x, 0);

        // Draws background objects
        this.addObjectsToMap(this.level.backgroundObjects);

        // Draws moving objects
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);

        // Resets translation before drawing solid objects
        this.ctx.translate(-this.camera_x, 0);

        // Draws solid objects (status bars) on top of other objects
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndBoss);

        // Requests the next frame of the animation
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the game world map.
     * @param {DrawableObject[]} objects - An array of drawable objects to be added.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a drawable object to the game world map.
     * @param {DrawableObject} mo - The drawable object to be added.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally to handle objects facing the other direction.
     * @param {DrawableObject} mo - The drawable object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original orientation after flipping.
     * @param {DrawableObject} mo - The drawable object to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
