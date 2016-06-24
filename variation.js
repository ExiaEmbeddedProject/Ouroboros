function randomWithProbability() {
    // Yeah i'm a noob with Maths
    var notRandomNumbers = [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.6,0.6,0.6,0.6,0.7,0.7,0.8,0.8,0.9,1,0.4,0.4,0.4,0.4,0.3,0.3,0.2,0.2,0.1,0];
    var idx = Math.floor(Math.random() * notRandomNumbers.length);
    return notRandomNumbers[idx];
}

function getRandomArbitrary(min, max) {
    return randomWithProbability() * (max - min) + min;
};

function variation(base, amplitude) {
    return getRandomArbitrary(base - amplitude, base + amplitude);
};

module.exports = variation;