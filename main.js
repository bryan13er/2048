// main.js
const DIRECTIONS = require('./directions');
const Game2048 = require('./Game2048');

let game = new Game2048(4);

// Add some tiles to the board
game.addTile(0, 0, 2);
game.addTile(1, 0, 2)
game.addTile(2, 0, 2)

console.log("Before Shift:");
game.printBoard();

function testShift(direction){
    game.shift(direction);
    console.log("After shift:", direction);
    game.printBoard(direction);
}

// testShift(DIRECTIONS.DOWN)
testShift(DIRECTIONS.UP)
// testShift(DIRECTIONS.LEFT)
// testShift(DIRECTIONS.DOWN)
// testShift(DIRECTIONS.LEFT)

