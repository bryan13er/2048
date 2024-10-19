const readline = require('readline');

// Setup readline interface to listen for key presses
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (str, key) => {
    if (key.name === 'up') {
        console.log('Up arrow pressed');
        // Call moveUp() logic here
    } else if (key.name === 'down') {
        console.log('Down arrow pressed');
        // Call moveDown() logic here
    } else if (key.name === 'left') {
        console.log('Left arrow pressed');
        // Call moveLeft() logic here
    } else if (key.name === 'right') {
        console.log('Right arrow pressed');
        // Call moveRight() logic here
    } else if (key.ctrl && key.name === 'c') {
        process.exit(); // Exit the program on Ctrl+C
    }
});

// Example move functions
function moveUp() {
    console.log("Moving tiles up...");
}

function moveDown() {
    console.log("Moving tiles down...");
}

function moveLeft() {
    console.log("Moving tiles left...");
}

function moveRight() {
    console.log("Moving tiles right...");
}

console.log("Use the arrow keys to move. Press Ctrl+C to exit.");
