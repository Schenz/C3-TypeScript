import { Kata } from './kata';

let fixture: Kata;

beforeEach(() => {
    fixture = new Kata();
});

jest.setTimeout(300000);

describe('Kata Tests', () => {
    it.each`
        days         | expected
        ${1}         | ${55}
        ${2}         | ${59.5}
        ${7}         | ${54.3}
        ${14}        | ${49.9}
        ${365}       | ${68.4}
    `(
        'returns $expected when $days is passed to function',
        async ({ days, expected }) => {
            expect(await fixture.getWeatherData(days)).toEqual(expected);
        }
    );
});
