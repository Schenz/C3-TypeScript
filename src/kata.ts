
export class Kata {
    public ceaserEncryption(text: string, shift: number): string {
        const shifted = getShift(shift);
        let cipherText = ""
        text.split('').forEach(char => {
            const charCode = char.charCodeAt(0);
            if (charCode >= 65 && charCode <= 90){
                const code = ((charCode - 65 + shifted) % 26) + 65;
                console.log(code);
                cipherText += String.fromCharCode(code);
            } else if (charCode >= 97 && charCode <= 122){
                const a = charCode - 97 + shifted;
                const b = (a) % 26;
                const code = (b) + 97;
                console.log(code);
                cipherText += String.fromCharCode(code);
            } else {
                cipherText += char
            }
        })
        return cipherText;
    }
}
function getShift(shift: number): number {
    if (shift < 0) {
        return getShift(26 + shift);
    } else if (shift > 26) {
        return getShift(shift - 26);
    } else {
        return shift;
    }
}

