export class Kata {
    private readonly boardSize: number;
    private static readonly KNIGHT_MOVES = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];

    constructor(boardSize: number = 8) {
        this.boardSize = boardSize;
    }

    public solveKnightsTour(startX: number, startY: number): number[][] | null {
        // Initialize the board
        const board: number[][] = Array.from({ length: this.boardSize }, () =>
            Array(this.boardSize).fill(-1)
        );

        // Mark starting position
        board[startX][startY] = 0;

        // Start solving the Knight's Tour
        if (this.knightsTourHelper(board, startX, startY, 1)) {
            return board;
        }

        return null; // No solution found
    }

    private knightsTourHelper(board: number[][], x: number, y: number, moveCount: number): boolean {
        if (moveCount === this.boardSize * this.boardSize) {
            return true; // Solution complete
        }

        // Generate all valid moves and sort them using Warnsdorff's heuristic
        const moves = this.generateValidMoves(board, x, y).sort(
            (a, b) => this.countValidMoves(board, a[0], a[1]) - this.countValidMoves(board, b[0], b[1])
        );

        for (const [nextX, nextY] of moves) {
            board[nextX][nextY] = moveCount; // Make the move

            if (this.knightsTourHelper(board, nextX, nextY, moveCount + 1)) {
                return true;
            }

            board[nextX][nextY] = -1; // Backtrack
        }

        return false;
    }

    private generateValidMoves(board: number[][], x: number, y: number): number[][] {
        const moves: number[][] = [];
        for (const [dx, dy] of Kata.KNIGHT_MOVES) {
            const nextX = x + dx;
            const nextY = y + dy;

            if (this.isValidMove(board, nextX, nextY)) {
                moves.push([nextX, nextY]);
            }
        }
        return moves;
    }

    private countValidMoves(board: number[][], x: number, y: number): number {
        let count = 0;
        for (const [dx, dy] of Kata.KNIGHT_MOVES) {
            const nextX = x + dx;
            const nextY = y + dy;

            if (this.isValidMove(board, nextX, nextY)) {
                count++;
            }
        }
        return count;
    }

    private isValidMove(board: number[][], x: number, y: number): boolean {
        return x >= 0 && x < this.boardSize &&
               y >= 0 && y < this.boardSize &&
               board[x][y] === -1;
    }

    public displayBoard(board: number[][] | null): string {
        if (!board) {
            return "No solution found.";
        }

        return board
            .map(row => row.map(cell => cell.toString().padStart(2, '0')).join(' '))
            .join('\n');
    }
}
