const assert = require('assert');
const sinon = require('sinon');
const { print_border, print_row } = require('./base_game');

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

    it('should print a border of 13 # characters', function() {
        // Call the function
        print_border();

        // Assert that console.log was called with the correct argument
        assert(consoleSpy.calledWithExactly('#############'));
    });

    it('should print row as ## 1 2 3 4 ##', function() {
        // Call the function with a test row
        print_row([1, 2, 3, 4]);

        // Assert that console.log was called with the correct formatted output
        assert(consoleSpy.calledWithExactly('## 1 2 3 4 ##'));
    });
});
