// Game2048.js

// Import the shift function from the shiftLogic.js file
const { shift } = require('./shiftLogic');

class Game2048 {
    constructor(size) {
        this.size = size;
        this.sparseBoard = {};  // Sparse dictionary to hold only non-null tiles
        this.keyMap = this.initializeKeyMap(size);  // Array of precomputed keys
        this.allKeys = this.flattenKeyMap();  // Flattened list of all possible keys
    }

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

    // Flatten the keyMap to a single list of all possible keys
    flattenKeyMap() {
        return this.keyMap.flat();  // Flatten the 2D array into a 1D array of all keys
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

    // Find all available spaces by XOR-like operation between allKeys and sparseBoard keys
    getAvailableSpaces() {
        return this.allKeys.filter(key => !(key in this.sparseBoard));
    }

    // Add a random tile to the board (either a 2 or 4)
    addRandomTile() {
        let availableSpaces = this.getAvailableSpaces();
        if (availableSpaces.length > 0) {
            const randomKey = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
            const [row, col] = randomKey.split(',').map(Number);  // Convert the key back to row and col
            const value = Math.random() < 0.9 ? 2 : 4;  // 90% chance of 2, 10% chance of 4
            this.addTile(row, col, value);
        }
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

    // Print the board for visualization with dynamic spacing
    printBoard() {
        let board = this.generate2DArray();

        // Find the largest value directly from the sparseBoard
        let maxNum = Math.max(...Object.values(this.sparseBoard));
        let maxLength = maxNum.toString().length;  // Length of the largest number

        // Print the board with consistent spacing
        for (let row of board) {
            console.log(
                row.map(cell => (cell !== null ? cell.toString().padStart(maxLength, ' ') : '-'.padStart(maxLength, ' ')))
                .join(" ")
            );
        }
    }


    // I am not conviced this works yet just a tmp function
    // Check if the game is over (no moves left)
    checkGameOver() {
        let hasEmptyTiles = Object.keys(this.sparseBoard).length < this.size * this.size;
        if (hasEmptyTiles) return false;  // There are still empty tiles

        // Check if there are any adjacent tiles that can merge
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                let key = this.keyMap[row][col];
                let current = this.sparseBoard[key];
                if (current !== undefined) {
                    // Check adjacent tiles (right and down) for possible merges
                    if (col + 1 < this.size) {
                        let rightKey = this.keyMap[row][col + 1];
                        if (this.sparseBoard[rightKey] === current) return false;
                    }
                    if (row + 1 < this.size) {
                        let downKey = this.keyMap[row + 1][col];
                        if (this.sparseBoard[downKey] === current) return false;
                    }
                }
            }
        }

        // If no empty tiles and no merges are possible, the game is over
        return true;
    }

}

module.exports = Game2048;
