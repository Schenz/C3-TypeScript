import { Kata } from './kata';

let fixture: Kata;

beforeEach(() => {
    fixture = new Kata();
});

describe('Kata Tests', () => {
    it.each`
        teams | expected
        ${0}  | ${[[-1]]}
        ${1}  | ${[[-1]]}
        ${2}  | ${[[1, 2]]}
        ${3}  | ${[[1, 2], [1, 3], [2, 3]]}
        ${4}  | ${[[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]}
        ${10} | ${[[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [6, 7], [6, 8], [6, 9], [6, 10], [7, 8], [7, 9], [7, 10], [8, 9], [8, 10], [9, 10]]}
    `(
        'returns $expected when $teams is passed to function',
        ({ teams, expected }) => {
            expect(fixture.roundRobinTournamentRecursive(teams)).toEqual(
                expected
            );
        }
    );

    it.each`
        teams | expected
        ${0}  | ${[]}
        ${1}  | ${[]}
        ${2}  | ${[['Team 1', 'Team 2']]}
        ${3}  | ${[['Team 1', 'Team 3'], ['Team 2', 'Team 2'], ['Team 1', 'Team 2'], ['Team 3', 'Team 3']]}
        ${4}  | ${[['Team 1', 'Team 4'], ['Team 2', 'Team 3'], ['Team 1', 'Team 3'], ['Team 4', 'Team 2'], ['Team 1', 'Team 2'], ['Team 3', 'Team 4']]}
        ${10} | ${[['Team 1', 'Team 10'], ['Team 2', 'Team 9'], ['Team 3', 'Team 8'], ['Team 4', 'Team 7'], ['Team 5', 'Team 6'], ['Team 1', 'Team 9'], ['Team 10', 'Team 8'], ['Team 2', 'Team 7'], ['Team 3', 'Team 6'], ['Team 4', 'Team 5'], ['Team 1', 'Team 8'], ['Team 9', 'Team 7'], ['Team 10', 'Team 6'], ['Team 2', 'Team 5'], ['Team 3', 'Team 4'], ['Team 1', 'Team 7'], ['Team 8', 'Team 6'], ['Team 9', 'Team 5'], ['Team 10', 'Team 4'], ['Team 2', 'Team 3'], ['Team 1', 'Team 6'], ['Team 7', 'Team 5'], ['Team 8', 'Team 4'], ['Team 9', 'Team 3'], ['Team 10', 'Team 2'], ['Team 1', 'Team 5'], ['Team 6', 'Team 4'], ['Team 7', 'Team 3'], ['Team 8', 'Team 2'], ['Team 9', 'Team 10'], ['Team 1', 'Team 4'], ['Team 5', 'Team 3'], ['Team 6', 'Team 2'], ['Team 7', 'Team 10'], ['Team 8', 'Team 9'], ['Team 1', 'Team 3'], ['Team 4', 'Team 2'], ['Team 5', 'Team 10'], ['Team 6', 'Team 9'], ['Team 7', 'Team 8'], ['Team 1', 'Team 2'], ['Team 3', 'Team 10'], ['Team 4', 'Team 9'], ['Team 5', 'Team 8'], ['Team 6', 'Team 7']]}
    `(
        'returns $expected when $teams is passed to function',
        ({ teams, expected }) => {
            expect(fixture.createRoundRobin(teams)).toEqual(expected);
        }
    );
});
