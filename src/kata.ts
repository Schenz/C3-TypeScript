class Item {
    constructor(public name: string, public weight: number, public value: number) {}
}

function knapsack(items: Item[], capacity: number): { selectedItems: Item[], totalWeight: number, totalValue: number } {
    const numItems = items.length;
    const dp: number[][] = Array.from({ length: numItems + 1 }, () => Array(capacity + 1).fill(0));

    for (let i = 1; i <= numItems; i++) {
        const currentItem = items[i - 1];
        for (let currentCapacity = 1; currentCapacity <= capacity; currentCapacity++) {
            if (currentItem.weight <= currentCapacity) {
                dp[i][currentCapacity] = Math.max(
                    dp[i - 1][currentCapacity],
                    dp[i - 1][currentCapacity - currentItem.weight] + currentItem.value
                );
            } else {
                dp[i][currentCapacity] = dp[i - 1][currentCapacity];
            }
        }
    }

    let totalWeight = 0;
    let totalValue = dp[numItems][capacity];
    const selectedItems: Item[] = [];

    let currentItemIndex = numItems;
    let remainingCapacity = capacity;
    while (currentItemIndex > 0 && remainingCapacity > 0) {
        if (dp[currentItemIndex][remainingCapacity] !== dp[currentItemIndex - 1][remainingCapacity]) {
            const selectedItem = items[currentItemIndex - 1];
            selectedItems.push(selectedItem);
            totalWeight += selectedItem.weight;
            remainingCapacity -= selectedItem.weight;
        }
        currentItemIndex--;
    }

    return {
        selectedItems,
        totalWeight,
        totalValue
    };
}

// Define items
const items: Item[] = [
    new Item("Diamond necklace", 2, 50000),
    new Item("Antique gold pocket watch", 1, 8000),
    new Item("Rare vintage wine collection", 20, 15000),
    new Item("Original Picasso painting", 6, 200000),
    new Item("Emerald-encrusted bracelet", 1, 25000),
    new Item("Sculpted marble statue", 50, 30000),
    new Item("Signed first edition books", 10, 12000),
    new Item("Precious ancient coins", 3, 18000),
    new Item("Designer handbags", 4, 6000),
    new Item("High-end electronics", 8, 10000),
    new Item("Expensive leather jackets", 6, 4000),
    new Item("Rare sports memorabilia", 3, 7000),
    new Item("Handcrafted silk rug", 15, 9000),
    new Item("Limited edition designer shoes", 2, 3000),
    new Item("Platinum cufflinks", 1, 5000),
    new Item("Valuable postage stamp collection", 2, 14000),
    new Item("Vintage movie posters", 3, 2500),
    new Item("Collectible action figures", 5, 1500),
    new Item("Fine china dining set", 12, 8000),
    new Item("Swarovski crystal figurines", 7, 4500)
];

// Define capacity
const capacity = 30;

// Solve the knapsack problem
const result = knapsack(items, capacity);

// Output the selected items, total weight, and total value
console.log("Selected items:");
result.selectedItems.forEach(item => console.log(`${item.name} - Weight: ${item.weight} lbs, Value: $${item.value}`));
console.log(`Total Weight: ${result.totalWeight} lbs`);
console.log(`Total Value: $${result.totalValue}`);
