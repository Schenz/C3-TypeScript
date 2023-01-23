export class Kata {
    public modPower(a: number, b: number, n: number): number {
        let c = 1,
            d = 0;

        while (d < b) {
            d++;
            c = (a * c) % n;
        }

        return c;
    }
}
