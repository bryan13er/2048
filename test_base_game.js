const assert = require('assert');
const sinon = require('sinon');
const { print_border, print_row, print_board } = require('./base_game');

describe('Base Game Functions', function() {
    let consoleSpy;

    // Setup: Create the spy before each test
    beforeEach(function() {
        consoleSpy = sinon.spy(console, 'log');
    });

    // Teardown: Restore console.log after each test
    afterEach(function() {
        consoleSpy.restore();
    });

    it('should print a border of 11 # characters', function() {
        // Call the function
        print_border();

        // Assert that console.log was called with the correct argument
        assert(consoleSpy.calledWithExactly('###########'));
    });

    it('should print row as # 1 2 3 4 #', function() {
        // Call the function with a test row
        print_row([1, 2, 3, 4]);

        // Assert that console.log was called with the correct formatted output
        assert(consoleSpy.calledWithExactly('# 1 2 3 4 #'));
    });
    
    it('should print simple board', function() {
        let board = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ];
    
        print_board(board);
    
        const correct_board = [
            '###############',
            '#  1  2  3  4 #',
            '#  5  6  7  8 #',
            '#  9 10 11 12 #',
            '# 13 14 15 16 #',
            '###############'
        ];
    
        correct_board.forEach((line, index) => {
            assert(consoleSpy.getCall(index).calledWithExactly(line));
        });
    });
    
    it('should print a board with empty spots', function() {
        let board = [
            [1, null, 3, 4],
            [5, 6, 7, null],
            [9, null, 11, 12],
            [13, null, null, null]
        ];
    
        print_board(board);
    
        const correct_board = [
            '###############',
            '#  1  -  3  4 #',
            '#  5  6  7  - #',
            '#  9  - 11 12 #',
            '# 13  -  -  - #',
            '###############'
        ];
    
        correct_board.forEach((line, index) => {
            assert(consoleSpy.getCall(index).calledWithExactly(line));
        });
    });
});
