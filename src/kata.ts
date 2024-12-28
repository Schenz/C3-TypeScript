export class Kata {
    public planSession(players: Player[], games: Game[]): Session {
        let session: Session = createEmptySession();

        games.forEach(game => { 
            players.forEach(player => { 
                if (player.startTime.hour < session.startTime.hour) {
                    session.startTime.hour = player.startTime.hour;
                }
                if (player.startTime.minute < session.startTime.minute) {
                    session.startTime.minute = player.startTime.minute;
                }
                if (player.endTime.hour > session.endTime.hour) {
                    session.endTime.hour = player.endTime.hour;
                }
                if (player.endTime.minute > session.endTime.minute) {
                    session.endTime.minute = player.endTime.minute;
                }
            });
        });
        return session;
    }
}

const createEmptySession = (): Session => ({
    valid: false,
    dayOfWeek: 0,
    startTime: { hour: 0, minute: 0 },
    endTime: { hour: 0, minute: 0 },
    games: [],
    players: []
})

type Time = {
    hour: number;   // 0 to 23
    minute: number; // 0 to 59
};

export type Player = {
    name: string;
    dayOfWeek: number;
    startTime: Time;
    endTime: Time;
};

export type Game = {
    name: string;
    duration: number;
    minPlayers: number;
    maxPlayers: number;
}

export type Session = {
    valid: boolean;
    dayOfWeek: number;
    startTime: Time;
    endTime: Time;
    games: Game[];
    players: Player[];
};