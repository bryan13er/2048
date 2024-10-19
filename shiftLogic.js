// shiftLogic.js
const DIRECTIONS = require('./directions');

function shift(board, direction, size) {
    for (let i = 0; i < size; i++) {
        // Extract the row or column from the sparse matrix
        let line = getLine(board, direction, i, size);

        // Remove nulls and calculate how many nulls to add
        line = line.filter(item => item !== null);
        line = merge(line, direction);

        let nullsToAdd = size - line.length;
        
        // Add padding if there are nulls to add
        if (nullsToAdd > 0) {
            line = padLine(line, nullsToAdd, direction);
        }

        // Update the sparse matrix with the modified line
        updateSparseMatrix(board, line, direction, i, size);
    }
}

// Extract row or column based on direction
function getLine(board, direction, index, size) {
    let line = [];
    for (let j = 0; j < size; j++) {
        let key;
        if (direction === DIRECTIONS.LEFT || direction === DIRECTIONS.RIGHT) {
            key = `${index},${j}`;  // Extract row
        } else {
            key = `${j},${index}`;  // Extract column
        }
        line.push(board[key] !== undefined ? board[key] : null);
    }
    return line;
}

// Pad the line with null values based on the direction
function padLine(line, nullsToAdd, direction) {
    if (direction === DIRECTIONS.LEFT || direction === DIRECTIONS.UP) {
        // Add nulls to the end for left or up shifts
        return line.concat(Array(nullsToAdd).fill(null));
    } else {
        // Add nulls to the beginning for right or down shifts
        return Array(nullsToAdd).fill(null).concat(line);
    }
}

function merge(line, direction) {
    // Reverse the line for RIGHT or DOWN directions
    if (direction === DIRECTIONS.RIGHT || direction === DIRECTIONS.DOWN) {
        line.reverse();
    }

    let mergedLine = [];
    let i = 0;

    // Merge adjacent tiles if they are equal
    while (i < line.length) {
        if (i + 1 < line.length && line[i] === line[i + 1]) {
            mergedLine.push(line[i] * 2);  // Merge tiles
            i += 2;  // Skip the next tile since it's merged
        } else {
            mergedLine.push(line[i]);  // No merge, just add the tile
            i += 1;
        }
    }

    // Reverse the line back if it was reversed initially
    if (direction === DIRECTIONS.RIGHT || direction === DIRECTIONS.DOWN) {
        mergedLine.reverse();
    }

    return mergedLine;
}

// Update the sparse matrix after the line has been modified
function updateSparseMatrix(board, line, direction, index, size) {
    for (let j = 0; j < size; j++) {
        let key;
        if (direction === DIRECTIONS.LEFT || direction === DIRECTIONS.RIGHT) {
            key = `${index},${j}`;  // Update row
        } else {
            key = `${j},${index}`;  // Update column
        }

        if (line[j] !== null) {
            // Update sparse matrix with non-null value
            board[key] = line[j];
        } else {
            // Remove null values from the sparse matrix
            delete board[key];
        }
    }
}

module.exports = { shift };
