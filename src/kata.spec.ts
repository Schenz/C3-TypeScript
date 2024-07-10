import 'jest';
import { Kata } from './kata';

let fixture: Kata;

beforeEach(() => {
    fixture = new Kata();
});

describe('Kata Tests', () => {
    it.each`
        source                                                                  | expected
        ${["file10", "file2", "file1a", "file1b", "file20", "file11", "file3"]} | ${["file1a", "file1b", "file2", "file3", "file10", "file11", "file20"]}
    `(
        'returns [$expected] when [$source] is passed to function',
        ({ source, expected }) => {
            expect(fixture.sort(source)).toEqual(expected);
        }
    );
});
