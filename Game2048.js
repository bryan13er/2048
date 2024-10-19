// Game2048.js

// Import the shift function from the shiftLogic.js file
const { shift } = require('./shiftLogic');

class Game2048 {
    constructor(size) {
        this.size = size;
        this.sparseBoard = {};  // Sparse dictionary to hold only non-null tiles
        this.keyMap = this.initializeKeyMap(size);  // Array of precomputed keys 
    }

    // Static property to hold the directions
    static DIRECTIONS = {
        LEFT: "left",
        RIGHT: "right",
        UP: "up",
        DOWN: "down"
    };

    // Initialize the 2D key map with coordinate strings
    initializeKeyMap(size) {
        let keyMap = [];
        for (let row = 0; row < size; row++) {
            keyMap[row] = [];
            for (let col = 0; col < size; col++) {
                keyMap[row][col] = `${row},${col}`;
            }
        }
        return keyMap;
    }

    // Add a tile to the sparse board
    addTile(row, col, value) {
        let key = this.keyMap[row][col];
        this.sparseBoard[key] = value;
    }

    // Remove a tile from the sparse board
    removeTile(row, col) {
        let key = this.keyMap[row][col];
        delete this.sparseBoard[key];
    }

    // Shift the board in a given direction using the imported helper
    shift(direction) {
        shift(this.sparseBoard, direction, this.size);  // Pass board, direction, and size
    }

    // Convert the sparse dictionary to a 2D array
    generate2DArray() {
        let board = Array.from({ length: this.size }, () => Array(this.size).fill(null));

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                let key = this.keyMap[row][col];
                board[row][col] = this.sparseBoard[key] !== undefined ? this.sparseBoard[key] : null;
            }
        }

        return board;
    }

    // Print the board for visualization
    printBoard() {
        let board = this.generate2DArray();
        // console.log("Current Board:");
        for (let row of board) {
            console.log(row.map(cell => (cell !== null ? cell : "-")).join(" "));
        }
    }
}

// Export the Game2048 class
module.exports = Game2048;
