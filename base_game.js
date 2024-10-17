function getMaxNumberLength(board) {
    let maxNum = Math.max(...board.flat().filter(num => num !== null && num !== ''));
    return maxNum.toString().length;
}

function print_row(row, maxLength = 1) {
    if (!row) {
        return -1;
    }

    let row_out = "# ";
    for (let i in row) {
        // Dynamically pad each number based on the length of the largest number
        let value = row[i] !== null && row[i] !== '' ? row[i].toString() : '-';
        row_out += value.padStart(maxLength, ' ');
        row_out += ' ';
    }
    row_out += '#';

    console.log(row_out);
}

function print_border(maxLength = 1) {
    let totalLength = (maxLength + 1) * 4 + 3;  // Calculate border based on row length
    let border = "#".repeat(totalLength);
    console.log(border);
}

function print_board(board) {
    if (!board) {
        return -1;
    }

    let maxLength = getMaxNumberLength(board);

    print_border(maxLength);
    for (let row in board) {
        print_row(board[row], maxLength);
    }
    print_border(maxLength);
}

let board = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

let board2 = [
    [1, 2, null, 4],
    [5, 6, null, 8],
    [null, 10, 11, 12],
    [13, null, 15, 16]
];

print_board(board)

module.exports = {
    print_row,
    print_border,
    print_board
};
