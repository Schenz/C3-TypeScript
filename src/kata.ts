type Item = {
    name: string;
    weight: number;
    value: number;
};

export class KnapsackSolver {
    static solveKnapsack(items: Item[], capacity: number): Item[] {
        const itemCount = items.length;

        // Create a 2D array to store maximum values for different combinations of items and capacities
        const dpMatrix: number[][] = Array.from({ length: itemCount + 1 }, () => Array(capacity + 1).fill(0));

        // Fill the dynamic programming matrix with values based on knapsack problem logic
        console.log("Filling the Dynamic Programming Matrix:");
        for (let itemIndex = 1; itemIndex <= itemCount; itemIndex++) {
            const currentItem = items[itemIndex - 1];
            console.log(`\tConsidering item: ${currentItem.name}`);
            for (let currentCapacity = 1; currentCapacity <= capacity; currentCapacity++) {
                console.log(`\t\tCurrent capacity: ${currentCapacity}`);
                if (currentItem.weight <= currentCapacity) {
                    // If the current item can fit into the current capacity,
                    // choose the maximum value between including and excluding the current item
                    const valueWithItem = currentItem.value + dpMatrix[itemIndex - 1][currentCapacity - currentItem.weight];
                    const valueWithoutItem = dpMatrix[itemIndex - 1][currentCapacity];
                    console.log(`\t\t\tValue with item: ${valueWithItem}`);
                    console.log(`\t\t\tValue without item: ${valueWithoutItem}`);
                    dpMatrix[itemIndex][currentCapacity] = Math.max(valueWithItem, valueWithoutItem);
                } else {
                    // If the current item cannot fit into the current capacity,
                    // simply use the value without including the current item
                    dpMatrix[itemIndex][currentCapacity] = dpMatrix[itemIndex - 1][currentCapacity];
                }
                console.log(`\t\tCurrent cell value: ${dpMatrix[itemIndex][currentCapacity]}`);
            }
        }

        // Display the filled dynamic programming matrix
        console.log("Dynamic Programming Matrix:");
        for (let i = 0; i <= itemCount; i++) {
            console.log(dpMatrix[i].join(", "));
        }

        // Backtrack to find the selected items
        let remainingCapacity = capacity;
        const selectedItems: Item[] = [];
        let currentItemIndex = itemCount, currentCapacity = capacity;
        console.log("Backtracking to find selected items:");
        while (currentItemIndex > 0 && currentCapacity > 0) {
            const currentItem = items[currentItemIndex - 1];
            const valueWithoutItem = dpMatrix[currentItemIndex - 1][currentCapacity];
            console.log(`\tConsidering item: ${currentItem.name}`);
            console.log(`\tRemaining capacity: ${currentCapacity}`);
            console.log(`\tValue without item: ${valueWithoutItem}`);
            // Check if the value with the current item is greater than the value without the current item
            if (dpMatrix[currentItemIndex][currentCapacity] !== valueWithoutItem) {
                // If including the current item increases the value, add it to the selected items
                console.log(`\t\tIncluding item: ${currentItem.name}`);
                selectedItems.push(currentItem);
                // Update remaining capacity and current capacity
                remainingCapacity -= currentItem.weight;
                currentCapacity -= currentItem.weight;
                console.log(`\t\tRemaining capacity after including item: ${remainingCapacity}`);
            }
            // Move to the previous item
            currentItemIndex--;
        }

        // Display the selected items
        console.log("Selected Items:");
        selectedItems.forEach(item => console.log(item));

        return selectedItems;
    }
}

// Test
const items: Item[] = [
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

//const selectedItems = KnapsackSolver.solveKnapsack(items.sort((a, b) => a.weight - b.weight), capacity);
//const selectedItems = KnapsackSolver.solveKnapsack(items.sort((a, b) => b.value - a.value), capacity);
const selectedItems = KnapsackSolver.solveKnapsack(items, capacity);

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
