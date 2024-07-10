export class Kata {
    public sort(source: string[]): string[] {
        return source.sort(this.naturalSort);
    }

    private naturalSort(a: string, b: string): number {
        const re = /(\d+|\D+)/g;
    
        const aParts = a.match(re) || [];
        const bParts = b.match(re) || [];
    
        const maxLength = Math.max(aParts.length, bParts.length);
    
        for (let i = 0; i < maxLength; i++) {
            const aPart = aParts[i] || '';
            const bPart = bParts[i] || '';
    
            const aIsNumber = !isNaN(Number(aPart));
            const bIsNumber = !isNaN(Number(bPart));
    
            if (aIsNumber && bIsNumber) {
                const diff = Number(aPart) - Number(bPart);
                if (diff !== 0) {
                    return diff;
                }
            } else if (aIsNumber) {
                return -1;
            } else if (bIsNumber) {
                return 1;
            } else {
                const diff = aPart.localeCompare(bPart);
                if (diff !== 0) {
                    return diff;
                }
            }
        }
    
        return 0;
    }
}
