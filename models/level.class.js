/**
 * Represents a game level.
 */
class Level {
    enemies;            // Array to store enemy objects
    clouds;             // Array to store cloud objects
    backgroundObjects;  // Array to store background objects
    coins;              // Array to store coin objects
    bottles;            // Array to store bottle objects
    level_end_x = 4400; // X-coordinate where the level ends

    /**
     * Creates a new level with the specified game objects.
     * @param {array} enemies - An array of enemy objects.
     * @param {array} clouds - An array of cloud objects.
     * @param {array} backgroundObjects - An array of background objects.
     * @param {array} coins - An array of coin objects.
     * @param {array} bottles - An array of bottle objects.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
