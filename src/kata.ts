export class Kata {
    runLengthEncoding = (str: string): Array<[number, string]> => {
        if (!str || str.length === 0) {
            throw new Error('The input string cannot be null or empty.');
        }

        const result: Array<[number, string]> = [];

        let currentChar = str[0];
        let count = 1;

        for (let i = 1; i < str.length; i++) {
            if (str[i] === currentChar) {
                count++;
            } else {
                result.push([count, currentChar]);
                currentChar = str[i];
                count = 1;
            }
        }

        result.push([count, currentChar]);

        return result;
    };

    runLengthEncodingFunctional = (str: string): Array<[number, string]> => {
        // Check if the input string is valid
        if (!str || str.length === 0) {
            throw new Error('The input string cannot be null or empty.');
        }
        const result: Array<[number, string]> = [];
        let currentChar = '';
        let count = 0;

        str.split('').forEach((char, index) => {
            if (char === currentChar) {
                count++;
            } else {
                if (index !== 0) {
                    result.push([count, currentChar]);
                }
                currentChar = char;
                count = 1;
            }
        });

        result.push([count, currentChar]);

        return result;
    };
}
