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

const backgroundObjects = [];
const repeats = 4; // Wie oft das gesamte Muster wiederholt werden soll
const xIncrement = 719; // Verschiebung auf der x-Achse für jede Wiederholung

for (let repeat = 0; repeat < repeats; repeat++) {
    for (let i = 0; i < layers.length; i++) {
        const xPosition = repeat * xIncrement * 2 - xIncrement + (i >= layers.length / 2 ? xIncrement : 0);
        const imagePath = `img/5_background/layers/${layers[i]}`;
        backgroundObjects.push(new BackgroundObject(imagePath, xPosition));
    }
}
const chickens = [];
for (let i = 0; i < 12; i++) {
    chickens.push(new Chicken());
}

const chickenSmall = [];
for (let i = 0; i < 12; i++) {
    chickenSmall.push(new ChickenSmall());
}

// const enemies = [...chickens, ...chickenSmall, new Endboss()];


const clouds = [];
const totalClouds = 15;
const xSpacing = 500; // Abstand zwischen den Wolken

for (let i = 0; i < totalClouds; i++) {
    let xPosition = i * xSpacing;
    clouds.push(new Cloud(xPosition));
}

const coins = [];
for (let i = 0; i < 20; i++) {
    coins.push(new Coin());
}

const bottles = [];
for (let i = 0; i < 20; i++) {
    bottles.push(new Bottle());
}

// const level1 = new Level(
//     enemies,
//     clouds,
//     backgroundObjects,
//     coins,
//     bottles
// );

function createLevel1(world) {
    const endboss = new Endboss(world); // Erstellen des Endbosses mit der World-Referenz

    const enemies = [...chickens, ...chickenSmall, endboss]; // ...chickens, ...chickenSmall,

    return new Level(
        enemies,
        clouds,
        backgroundObjects,
        coins,
        bottles
    );
}