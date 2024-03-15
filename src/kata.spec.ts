import { Kata, Kata2 } from './kata';

let fixture: Kata;
let fixture2: Kata2;

beforeEach(() => {
    fixture = new Kata();
    fixture2 = new Kata2();
});

const expectedResultsFor10_000_000 = [142857, 1428570, 1429857]
const expectedResultsFor100_000_000 = [142857, 1428570, 1429857, 14285700, 14298570, 14299857]
const expectedResultsForKata2 = [1428570, 1429857, 14285700, 14298570, 14299857, 142857000, 142985700, 142998570, 142999857,]

describe('Kata Tests', () => {
    xit('should find the wonderland number', () => {
        const startTime = Date.now(); // Record start time
        const [matches, matchNumbers] = fixture.findWonderlandNumber();
        const endTime = Date.now(); // Record end time
        const duration = endTime - startTime;
        console.log(`Kata 1 found ${matches} wonderland numbers in ${formatDuration(duration)}`);
        expect(matchNumbers).toStrictEqual(expectedResultsFor100_000_000);
    });
});

describe('Kata2 Tests', () => {
    it('should find the wonderland number', () => {
        const startTime = Date.now(); // Record start time
        const [matches, matchNumbers] = fixture2.findWonderlandNumber();
        const endTime = Date.now(); // Record end time
        const duration = endTime - startTime;
        console.log(`Kata 2 found ${matches} wonderland numbers in ${formatDuration(duration)}`);
        expect(matchNumbers).toStrictEqual(expectedResultsForKata2);
    });
});

function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    const milliseconds = duration % 1000;
    return `${minutes} minutes, ${seconds} seconds, ${milliseconds} milliseconds`;
}