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

    let direction = '';

    // Handle arrow keys
    switch (key.name) {
        case 'up':
            direction = DIRECTIONS.UP;
            break;
        case 'down':
            direction = DIRECTIONS.DOWN;
            break;
        case 'left':
            direction = DIRECTIONS.LEFT;
            break;
        case 'right':
            direction = DIRECTIONS.RIGHT;
            break;
        default:
            return;  // Ignore other keys
    }
    game.shift(direction);

    // After shifting, re-render the board
    console.log();
    game.printBoard();
    game.printScore();

    // Check if the game is over
    if (game.checkGameOver()) {
        console.log("Game Over! No more moves left.");
        console.log("Final Score:", game.score)
        process.exit();  // End the game
    }
});

// Initial rendering of the board
console.log('Initial Board:');
game.printBoard();


