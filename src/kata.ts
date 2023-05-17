export class Kata {
    add = (word: string, bitArray: number[]): void => {
        const hash1 = this.hash(word, 1);
        const hash2 = this.hash(word, 2);
        const hash3 = this.hash(word, 3);

        bitArray[hash1] = 1;
        bitArray[hash2] = 1;
        bitArray[hash3] = 1;
    };

    private hash = (key: string, seed: number): number => {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = seed * (hash + key.charCodeAt(i));
        }
        return hash;
    };

    isPresent = (word: string, bitArray: number[]): boolean => {
        const hash1 = this.hash(word, 1);
        const hash2 = this.hash(word, 2);
        const hash3 = this.hash(word, 3);

        if (bitArray[hash1] === undefined) return false;
        if (bitArray[hash2] === undefined) return false;
        if (bitArray[hash3] === undefined) return false;
        return true;
    };
}
