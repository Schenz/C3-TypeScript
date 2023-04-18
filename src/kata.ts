export class Kata {
    roundRobinTournamentRecursive = (
        teams: number
    ): (number | null)[][] | undefined => {
        if (teams <= 1) {
            return [[-1]];
        }

        const generateFixtures = (
            teams: (number | null)[],
            fixtures: (number | null)[][] = []
        ): (number | null)[][] | undefined => {
            if (teams.length === 0) {
                return fixtures;
            }

            for (let i = 1; i < teams.length; i++) {
                if (teams[i] !== null) {
                    fixtures.push([teams[0], teams[i]]);
                }
            }

            return generateFixtures(teams.slice(1), fixtures);
        };

        const teamsArray: Array<number | null> = Array.from(
            { length: teams },
            (_, i) => i + 1
        );
        if (teams % 2 === 1) {
            teamsArray.push(null);
        }

        return generateFixtures(teamsArray);
    };

    createRoundRobin = (numTeams: number): string[][] => {
        const fixtures: string[][] = [];
        const teams: string[] = [];
        for (let i = 1; i <= numTeams; i++) {
            teams.push(`Team ${i}`);
        }

        const totalRounds = numTeams - 1;
        for (let round = 0; round < totalRounds; round++) {
            for (let i = 0; i < numTeams / 2; i++) {
                fixtures.push([teams[i], teams[numTeams - 1 - i]]);
            }
            teams.splice(1, 0, teams.pop() as string);
        }

        return fixtures;
    };

    buildMatchesTable = (numTeams: number): number[][][] => {
        if (numTeams % 2 !== 0) {
            throw new Error('Number of teams must be even.');
        }

        const matches: number[][][] = [];
        const teams: number[] = Array.from(
            { length: numTeams },
            (_, i) => i + 1
        );

        for (let round = 1; round < numTeams; round++) {
            const roundMatches: number[][] = [];
            for (let i = 0; i < numTeams / 2; i++) {
                const team1 = teams[i];
                const team2 = teams[numTeams - 1 - i];
                roundMatches.push([team1, team2]);
            }
            matches.push(roundMatches);
            teams.splice(1, 0, teams.pop() as number);
        }
        return matches;
    };
}
