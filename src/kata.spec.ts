import { Kata } from './kata';

let fixture: Kata;

beforeEach(() => {
    fixture = new Kata();
});

describe('modPower tests', () => {
    test.each`
        a        | b        | n         | expected
        ${4}     | ${13}    | ${497}    | ${445}
        ${67930} | ${32319} | ${103969} | ${6582}
        ${321}   | ${12345} | ${54321}  | ${45816}
    `(
        'returns $expected when $a is raised to the $b power then mod $n',
        ({ a, b, n, expected }) => {
            expect(fixture.modPower(a, b, n)).toBe(expected);
        }
    );
});
