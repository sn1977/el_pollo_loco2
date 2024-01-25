const layers = [
    'air.png',
     '3_third_layer/2.png',
    '2_second_layer/2.png',
    '1_first_layer/2.png',
    'air.png',
    '3_third_layer/1.png',
    '2_second_layer/1.png',
    '1_first_layer/1.png'
];

const repeats = 4; // How many times to repeat the entire pattern
const xIncrement = 719; // Displacement on the x-axis for each repetition

/**
 * This function creates level 1 of the game.
 * @param {object} world - The game world context.
 * @returns {Level} A new level object.
 */
function createLevel1(world) {
    const chickens = createChickens(12);
    const chickenSmall = createSmallChickens(12);
    const clouds = createClouds(15, 500);
    const coins = createCoins(20);
    const bottles = createBottles(20);
    const endboss = new Endboss(world);
    const enemies = [...chickens, ...chickenSmall, endboss];
    const backgroundObjects = createBackgroundObjects();

    return new Level(enemies, clouds, backgroundObjects, coins, bottles);
}

/**
 * This function creates a specified number of chicken enemies.
 * @param {number} count - The number of chickens to create.
 * @returns {Array} An array of Chicken objects.
 */
function createChickens(count) {
    const chickens = [];
    for (let i = 0; i < count; i++) {
        chickens.push(new Chicken());
    }
    return chickens;
}

/**
 * This function creates a specified number of small chicken enemies.
 * @param {number} count - The number of small chickens to create.
 * @returns {Array} An array of ChickenSmall objects.
 */
function createSmallChickens(count) {
    const chickenSmall = [];
    for (let i = 0; i < count; i++) {
        chickenSmall.push(new ChickenSmall());
    }
    return chickenSmall;
}

/**
 * This function creates clouds for the background.
 * @param {number} count - The number of clouds to create.
 * @param {number} spacing - Spacing between each cloud.
 * @returns {Array} An array of Cloud objects.
 */
function createClouds(count, spacing) {
    const clouds = [];
    for (let i = 0; i < count; i++) {
        let xPosition = i * spacing;
        clouds.push(new Cloud(xPosition));
    }
    return clouds;
}

/**
 * This function creates a specified number of coins.
 * @param {number} count - The number of coins to create.
 * @returns {Array} An array of Coin objects.
 */
function createCoins(count) {
    const coins = [];
    for (let i = 0; i < count; i++) {
        coins.push(new Coin());
    }
    return coins;
}

/**
 * This function creates a specified number of bottles.
 * @param {number} count - The number of bottles to create.
 * @returns {Array} An array of Bottle objects.
 */
function createBottles(count) {
    const bottles = [];
    for (let i = 0; i < count; i++) {
        bottles.push(new Bottle());
    }
    return bottles;
}

/**
 * This function creates the background objects for the game level.
 * @returns {Array} An array of background objects.
 */
function createBackgroundObjects() {
    const backgroundObjects = [];

    for (let repeat = 0; repeat < repeats; repeat++) {
        for (let i = 0; i < layers.length; i++) {
            const xPosition = repeat * xIncrement * 2 - xIncrement + (i >= layers.length / 2 ? xIncrement : 0);
            const imagePath = `img/5_background/layers/${layers[i]}`;
            backgroundObjects.push(new BackgroundObject(imagePath, xPosition));
        }
    }
    return backgroundObjects;
}
