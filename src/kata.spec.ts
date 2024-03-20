import { Kata } from './kata';

let fixture: Kata;

beforeEach(() => {
    fixture = new Kata();
});

describe('Kata Tests', () => {
    it.each`
        text    | shift  |  expected
        ${'1'}  | ${1}   | ${'1'}
        ${'a'}  | ${1}   | ${'b'}
        ${'a'}  | ${-1}  | ${'z'}
        ${'a'}  | ${27}  | ${'b'}
        ${'A'}  | ${1}   | ${'B'}
    `(
        'returns $expected when $text is passed to function with shift of $shift',
        ({ text, shift, expected }) => {
            expect(fixture.ceaserEncryption(text, shift)).toEqual(expected);
        }
    );
});
