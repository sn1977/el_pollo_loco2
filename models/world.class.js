class World {
    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndBoss = new StatusBarEndboss();
    level;
    canvas;
    keyboard;
    ctx;
    camera_x = 0;
    throwableObjects = [];
    pain_sound = new Audio('audio/pain.mp3');
    collectingBottle_sound = new Audio('audio/collectingBottle.mp3');
    collectingCoin_sound = new Audio('audio/collectingCoin.mp3');
    chickenDead_sound = new Audio('audio/chickenDead.mp3');
    smallChickenDead_sound = new Audio('audio/smallChickenDead.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = createLevel1(this); // Erstellen des Levels mit der World-Referenz
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsBottles();
            this.checkCollisionsCoins();
            this.refillHealth();
            this.checkBottleOnEnemy();
        }, 60);
        // addInterval(intervalId);
    }

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

    checkBottleOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Chicken) {
                        enemy.isDead = true;
                        this.chickenDead_sound.play();
                        this.removeEnemyAfterDelay(enemy);
                    } else if (enemy instanceof ChickenSmall) {
                        enemy.isDead = true;
                        this.smallChickenDead_sound.play(); // Abspielen des Sounds für kleine Hühner
                        this.removeEnemyAfterDelay(enemy);
                    } else if (enemy instanceof Endboss && !enemy.isHurt()) {
                        enemy.hit(); // Reduziert die Energie des Endbosses
                        this.statusBarEndBoss.setPercentage(enemy.energy);
                        bottle.hitEndboss();
                        enemy.playAnimation(enemy.IMAGES_HURT);
                    }
                    // Entfernen Sie die Flasche, sobald die Splash-Animation abgeschlossen ist
                    if (!bottle.isSplashing) {
                        const bottleIndex = this.throwableObjects.indexOf(bottle);
                        if (bottleIndex > -1) {
                            this.throwableObjects.splice(bottleIndex, 1);
                        }
                    }
                }
            });
        });
    }


    checkJumpingOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.isFalling()) {
                if (enemy instanceof Chicken) {
                    enemy.isDead = true;
                    this.chickenDead_sound.play(); // Abspielen des Sounds für normale Hühner
                    this.removeEnemyAfterDelay(enemy);
                } else if (enemy instanceof ChickenSmall) {
                    enemy.isDead = true;
                    this.smallChickenDead_sound.play(); // Abspielen des Sounds für kleine Hühner
                    this.removeEnemyAfterDelay(enemy);
                    console.log('Small Chicken defeated');
                }
            }
        });
    }

    removeEnemyAfterDelay(enemy) {
        setTimeout(() => {
            const enemyIndex = this.level.enemies.indexOf(enemy);
            if (enemyIndex > -1) {
                this.level.enemies.splice(enemyIndex, 1); // Entfernen des Feindes an der gefundenen Indexposition
            }
        }, 1000); // Verzögerung von 1000 Millisekunden (1 Sekunde)
    }


    checkThrowObjects() {
        if (this.keyboard.KEY_D && this.statusBarBottle.amountBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.amountBottles -= 1;
            this.statusBarBottle.setAmountBottles(this.statusBarBottle.amountBottles);
        }
    }

    refillHealth() {
        if (this.keyboard.KEY_F && this.statusBarCoin.amountCoins > 0) {
            this.statusBarCoin.amountCoins -= 1;
            this.character.energy += 5;
            this.statusBarCoin.setAmountCoins(this.statusBarCoin.amountCoins);
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    reset() {
        // // Setzen Sie hier alle notwendigen Eigenschaften zurück
        // this.character = new Character();
        // Setzen Sie alle anderen Eigenschaften zurück, die zurückgesetzt werden müssen
        this.level = createLevel1(this);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Verschiebt den Canvas, um die Kamerabewegung zu simulieren
        this.ctx.translate(this.camera_x, 0);

        // Zeichnet Hintergrundobjekte
        this.addObjectsToMap(this.level.backgroundObjects);

        // Zeichnet bewegliche Objekte
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);

        // Setzt die Übersetzung zurück, bevor feste Objekte gezeichnet werden
        this.ctx.translate(-this.camera_x, 0);

        // Zeichnet feste Objekte (Statusleisten) über anderen Objekten
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndBoss);

        // Fordert den nächsten Frame der Animation an
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}