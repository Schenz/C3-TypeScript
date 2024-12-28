import { Game, Kata, Player, Session } from './kata';

let fixture: Kata;

beforeEach(() => {
    fixture = new Kata();
});

const testPlayers1: Player[] = [];
const testGames1: Game[] = [];
const expectedResult1: Session = {
    valid: false,
    dayOfWeek: 0,
    startTime: { hour: 0, minute: 0 },
    endTime: { hour: 0, minute: 0 },
    games: [],
    players: []
};

describe('Kata Tests', () => {
    it.each`
        players             | games         |   expected
        ${testPlayers1}     | ${testGames1} |   ${expectedResult1}
    `(
        'returns $expected when $players and $games is passed to function',
        ({ players, games, expected }) => {
            expect(fixture.planSession(players, games)).toEqual(expected);
        }
    );
});
