import { Kata } from './kata';

let fixture: Kata;

beforeEach(() => {
    fixture = new Kata();
});

describe('Kata Tests', () => {
    [
        {
            name: 'test1',
            given: {
                wordsToAdd: 'apple',
                wordToCheck: 'apple',
            },
            expected: true,
        },
        {
            name: 'test2',
            given: {
                wordsToAdd: 'apple,banana',
                wordToCheck: 'apple',
            },
            expected: true,
        },
        {
            name: 'test3',
            given: {
                wordsToAdd: 'apple,banana',
                wordToCheck: 'car',
            },
            expected: false,
        },
    ].forEach(({ name, given, expected }) => {
        it(name, () => {
            const bitArray: number[] = [];
            given.wordsToAdd.split(',').forEach((word) => {
                fixture.add(word, bitArray);
            });

            expect(fixture.isPresent(given.wordToCheck, bitArray)).toBe(
                expected
            );
        });
    });
});
