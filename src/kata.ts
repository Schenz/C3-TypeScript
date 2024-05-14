type Item = {
    name: string;
    weight: number;
    value: number;
};

interface KnapsackResult {
    maxValue: number;
    selectedItems: Item[];
}

function knapsack(items: Item[], knapsackCapacity: number): KnapsackResult {
    const numItems = items.length;
    const dp: number[][] = [];

    // Initialize the dp array with zeros
    for (let currentItemIdx = 0; currentItemIdx <= numItems; currentItemIdx++) {
        dp[currentItemIdx] = [];
        for (let currentCapacity = 0; currentCapacity <= knapsackCapacity; currentCapacity++) {
            dp[currentItemIdx][currentCapacity] = 0;
        }
    }

    // Build up the dp array
    for (let currentItemIdx = 1; currentItemIdx <= numItems; currentItemIdx++) {
        const currentItem = items[currentItemIdx - 1];
        for (let currentCapacity = 1; currentCapacity <= knapsackCapacity; currentCapacity++) {
            if (currentItem.weight <= currentCapacity) {
                dp[currentItemIdx][currentCapacity] = Math.max(
                    currentItem.value + dp[currentItemIdx - 1][currentCapacity - currentItem.weight],
                    dp[currentItemIdx - 1][currentCapacity]
                );
            } else {
                dp[currentItemIdx][currentCapacity] = dp[currentItemIdx - 1][currentCapacity];
            }
        }
    }

    console.dir(dp);

    // Reconstruct the selected items
    const selectedItems: Item[] = [];
    let currentItemIdx = numItems;
    let currentCapacity = knapsackCapacity;
    while (currentItemIdx > 0 && currentCapacity > 0) {
        if (dp[currentItemIdx][currentCapacity] !== dp[currentItemIdx - 1][currentCapacity]) {
            console.warn(`currentItemIdx: ${currentItemIdx}`);
            console.warn(`currentCapacity: ${currentCapacity}`);
            selectedItems.push(items[currentItemIdx - 1]);
            currentCapacity -= items[currentItemIdx - 1].weight;
        }
        currentItemIdx--;
    }

    // Return the maximum value and the selected items
    console.log('');
    console.warn(`numItems: ${numItems}`);
    console.warn(`knapsackCapacity: ${knapsackCapacity}`);
    return {
        maxValue: dp[numItems][knapsackCapacity],
        selectedItems: selectedItems,
    };
}

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

const result = knapsack(items, capacity);
console.log("Maximum value that can be achieved:", result.maxValue);
console.log("Selected items:", result.selectedItems.map(item => item.name));
