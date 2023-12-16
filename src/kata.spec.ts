/* cSpell:disable */
import { Kata } from './kata';

let fixture: Kata;

beforeEach(() => {
    fixture = new Kata();
});

describe('Kata Tests', () => {
    it.each`
        name                                       | expected
        ${'hello world!'}                          | ${[[1, 'h'], [1, 'e'], [2, 'l'], [1, 'o'], [1, ' '], [1, 'w'], [1, 'o'], [1, 'r'], [1, 'l'], [1, 'd'], [1, '!']]}
        ${'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbb'} | ${[[34, 'a'], [3, 'b']]}
    `(
        'returns $expected when $name is passed to function',
        ({ name, expected }) => {
            expect(fixture.runLengthEncoding(name)).toEqual(expected);
        }
    );

    it.each`
        name                                       | expected
        ${'hello world!'}                          | ${[[1, 'h'], [1, 'e'], [2, 'l'], [1, 'o'], [1, ' '], [1, 'w'], [1, 'o'], [1, 'r'], [1, 'l'], [1, 'd'], [1, '!']]}
        ${'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbb'} | ${[[34, 'a'], [3, 'b']]}
    `(
        'returns $expected when $name is passed to function',
        ({ name, expected }) => {
            expect(fixture.runLengthEncodingFunctional(name)).toEqual(expected);
        }
    );
});
