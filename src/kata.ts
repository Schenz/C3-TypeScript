export class Kata {
    static knapsack(items: { name: string, weight: number, value: number }[], capacity: number): { name: string, weight: number, value: number }[] {
        const itemCount = items.length;
        const knapsackMatrix: number[][] = Array.from({ length: itemCount + 1 }, () => Array(capacity + 1).fill(0));

        for (let itemIndex = 1; itemIndex <= itemCount; itemIndex++) {
            const currentItem = items[itemIndex - 1];
            for (let currentCapacity = 1; currentCapacity <= capacity; currentCapacity++) {
                if (currentItem.weight <= currentCapacity) {
                    knapsackMatrix[itemIndex][currentCapacity] = Math.max(
                        currentItem.value + knapsackMatrix[itemIndex - 1][currentCapacity - currentItem.weight],
                        knapsackMatrix[itemIndex - 1][currentCapacity]
                    );
                } else {
                    knapsackMatrix[itemIndex][currentCapacity] = knapsackMatrix[itemIndex - 1][currentCapacity];
                }
            }
        }

        let remainingCapacity = capacity;
        const selectedItems: { name: string, weight: number, value: number }[] = [];
        let currentItemIndex = itemCount, currentCapacity = capacity;
        while (currentItemIndex > 0 && currentCapacity > 0) {
            if (knapsackMatrix[currentItemIndex][currentCapacity] !== knapsackMatrix[currentItemIndex - 1][currentCapacity]) {
                const selectedItem = items[currentItemIndex - 1];
                selectedItems.push({ name: selectedItem.name, weight: selectedItem.weight, value: selectedItem.value });
                remainingCapacity -= selectedItem.weight;
                currentCapacity -= selectedItem.weight;
            }
            currentItemIndex--;
        }

        return selectedItems;
    }
}

// Test
const items = [
    { name: "Diamond necklace", weight: 2, value: 50_000 },
    { name: "Antique gold pocket watch", weight: 1, value: 8_000 },
    { name: "Rare vintage wine collection", weight: 20, value: 15_000 },
    { name: "Original Picasso painting", weight: 6, value: 200_000 },
    { name: "Emerald-encrusted bracelet", weight: 1, value: 25_000 },
    { name: "Sculpted marble statue", weight: 50, value: 30_000 },
    { name: "Signed first edition books", weight: 10, value: 12_000 },
    { name: "Precious ancient coins", weight: 3, value: 18_000 },
    { name: "Designer handbags", weight: 4, value: 6_000 },
    { name: "High-end electronics", weight: 8, value: 10_000 },
    { name: "Expensive leather jackets", weight: 6, value: 4_000 },
    { name: "Rare sports memorabilia", weight: 3, value: 7_000 },
    { name: "Handcrafted silk rug", weight: 15, value: 9_000 },
    { name: "Limited edition designer shoes", weight: 2, value: 3_000 },
    { name: "Platinum cufflinks", weight: 1, value: 5_000 },
    { name: "Valuable postage stamp collection", weight: 2, value: 14_000 },
    { name: "Vintage movie posters", weight: 3, value: 2_500 },
    { name: "Collectible action figures", weight: 5, value: 1_500 },
    { name: "Fine china dining set", weight: 12, value: 8_000 },
    { name: "Swarovski crystal figurines", weight: 7, value: 4_500 },
];
const capacity = 30;

const selectedItems = Kata.knapsack(items, capacity);

console.log("Selected items:");
selectedItems
    .sort((a, b) => b.weight - a.weight) // Sort items by weight in descending order
    .forEach(item => {
        const namePadding = 35; // Adjust as needed
        const weightPadding = 15; // Adjust as needed

        const itemName = item.name.padEnd(namePadding);
        const weight = `Weight: ${item.weight} lbs`.padEnd(weightPadding);
        const value = `$${item.value}`;

        console.log(`${itemName} - ${weight} - Value: ${value}`);
    });

const totalWeight = selectedItems.reduce((acc, item) => acc + item.weight, 0);
const totalValue = selectedItems.reduce((acc, item) => acc + item.value, 0);
console.log(`Total weight in knapsack: ${totalWeight} lbs`);
console.log(`Total value of all items in knapsack: $${totalValue}`);
