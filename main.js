// main.js
const DIRECTIONS = require('./directions');
const Game2048 = require('./Game2048');
const readline = require('readline');

// Set up readline interface to capture keypresses
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let game = new Game2048(4);

// Add some tiles to the board
game.addTile(0, 0, 2);
game.addTile(1, 0, 2)
game.addTile(2, 0, 2)

// console.log("Before Shift:");
// game.printBoard();

// function testShift(direction){
//     game.shift(direction);
//     console.log("After shift:", direction);
//     game.printBoard(direction);
// }

// Handle keypresses in the terminal
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();  // Allow exiting with Ctrl + C
    }

    // Handle arrow keys
    switch (key.name) {
        case 'up':
            game.shift(DIRECTIONS.UP);
            break;
        case 'down':
            game.shift(DIRECTIONS.DOWN);
            break;
        case 'left':
            game.shift(DIRECTIONS.LEFT);
            break;
        case 'right':
            game.shift(DIRECTIONS.RIGHT);
            break;
        default:
            return;  // Ignore other keys
    }

    // After shifting, re-render the board
    console.log();
    game.printBoard();
});

// Initial rendering of the board
console.log('Initial Board:');
game.printBoard();


