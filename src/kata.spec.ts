import { Kata } from './kata';

let fixture: Kata;

beforeEach(() => {
    fixture = new Kata();
});

describe('Knight’s Tour Tests', () => {
    it.each`
        startX | startY | description
        ${0}   | ${0}   | ${'top-left corner'}
        ${7}   | ${7}   | ${'bottom-right corner'}
        ${0}   | ${1}   | ${'near the top-left corner'}
        ${4}   | ${4}   | ${'center of the board'}
        ${2}   | ${2}   | ${'upper-middle area'}
        ${6}   | ${5}   | ${'lower-middle area'}
    `(
        'finds a solution for the knight’s tour starting at ($startX, $startY) - $description',
        ({ startX, startY, description }) => {
            const solution = fixture.solveKnightsTour(startX, startY);

            // Display the board for debugging and verification
            console.log(`Starting position: (${startX}, ${startY}) - ${description}`);
            console.log(fixture.displayBoard(solution));

            // Assert that a solution exists
            expect(solution).not.toBeNull();

            // Assert all squares are visited exactly once
            const flatBoard = solution!.flat();
            const uniqueMoves = new Set(flatBoard);
            expect(uniqueMoves.size).toBe(64);
        }
    );
});

describe('Knight’s Tour Tests different board sizes', () => {
    it.each`
        boardSize | startX | startY | description
        ${5}      | ${0}   | ${0}   | ${'5x5 board, top-left corner'}
        ${6}      | ${2}   | ${2}   | ${'6x6 board, center'}
        ${8}      | ${0}   | ${1}   | ${'8x8 board, near the top-left corner'}
    `(
        'finds a solution for a $boardSize x $boardSize board starting at ($startX, $startY) - $description',
        ({ boardSize, startX, startY, description }) => {
            const fixture = new Kata(boardSize);
            const solution = fixture.solveKnightsTour(startX, startY);

            // Display the board for debugging and verification
            console.log(`Starting position: (${startX}, ${startY}) on a ${boardSize}x${boardSize} board - ${description}`);
            console.log(fixture.displayBoard(solution));

            // Assert that a solution exists
            expect(solution).not.toBeNull();

            // Assert all squares are visited exactly once
            const flatBoard = solution!.flat();
            const uniqueMoves = new Set(flatBoard);
            expect(uniqueMoves.size).toBe(boardSize * boardSize);
        }
    );
});
