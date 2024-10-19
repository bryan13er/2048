// main.js
const DIRECTIONS = require('./directions');
const Game2048 = require('./Game2048');
const readline = require('readline');

// Set up readline interface to capture keypresses
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let game = new Game2048(4);

// Add initial random tiles to the board
game.addRandomTile();
game.addRandomTile();

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

    // Add a random tile after each move
    game.addRandomTile();

    // After shifting, re-render the board
    console.log();
    game.printBoard();
});

// Initial rendering of the board
console.log('Initial Board:');
game.printBoard();


