export class Kata {
    public getCategoryAnalytics(input: string): string {
        var rows = input.split(/\r?\n/);
        var dataRows = rows.slice(1);

        var filteredOutRecords: string[] = [];

        var data = dataRows.map((row) => {
            var columns = row.split(',');
            if (columns.length !== 5) {
                filteredOutRecords.push(row);
                return null;
            }
            var id = parseInt(columns[0]);
            if (isNaN(id)) {
                filteredOutRecords.push(row);
                return null;
            }
            var category = columns[1].replace(/^["']|["']$/g, ''); // Remove surrounding quotes
            var subcategory = columns[2].replace(/^["']|["']$/g, ''); // Remove surrounding quotes
            var value = columns[3]
                .replace(/^["']|["']$/g, '') // Remove surrounding quotes
                .replace(/[(),$€£%]/g, '')   // Remove common enclosing/formatting characters
                .replace(/\s+/g, '')         // Remove all whitespace
                .replace(/,/g, '');          // Remove commas used as thousand separators

            // Update to properly exclude a value of 53.XX
            if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                filteredOutRecords.push(row);
                return null;
            }

            if (isNaN(parseFloat(value))) {
                filteredOutRecords.push(row);
                return null;
            }

            var timestamp = new Date(columns[4]);
            if (isNaN(timestamp.getTime())) {
                filteredOutRecords.push(row);
                return null;
            }

            return {
                id: id,
                category: category,
                subcategory: subcategory,
                value: parseFloat(value),
                timestamp: timestamp
            };
        }).filter(record => record !== null) as DataRecord[];

        console.log('Filtered out records:', filteredOutRecords);

        // Overall calculations
        const overallTotal = data.reduce((acc, curr) => acc + curr.value, 0);
        const overallMin = data.reduce((acc, curr) => Math.min(acc, curr.value), data[0].value);
        const overallMax = data.reduce((acc, curr) => Math.max(acc, curr.value), data[0].value);
        const overallAvg = (overallTotal / data.length).toFixed(2);

        const roundedOverallTotal = overallTotal.toFixed(2);
        const roundedOverallMin = overallMin.toFixed(2);
        const roundedOverallMax = overallMax.toFixed(2);

        let output = `Overall: Total: ${roundedOverallTotal}, Min: ${roundedOverallMin}, Max: ${roundedOverallMax}, Avg: ${overallAvg}\n`;

        // Group data by category and subcategory
        const groupedByCategory = data.reduce((acc, curr) => {
            if (!acc[curr.category]) {
                acc[curr.category] = {};
            }
            if (!acc[curr.category][curr.subcategory]) {
                acc[curr.category][curr.subcategory] = [];
            }
            acc[curr.category][curr.subcategory].push(curr);
            return acc;
        }, {} as { [category: string]: { [subcategory: string]: DataRecord[] } });

        // Prepare the output for each category and subcategory
        for (const category in groupedByCategory) {
            const categoryData = groupedByCategory[category];

            // Category-level calculations
            const categoryTotal = Object.values(categoryData).flat().reduce((acc, curr) => acc + curr.value, 0);
            const categoryMin = Object.values(categoryData).flat().reduce((acc, curr) => Math.min(acc, curr.value), Object.values(categoryData).flat()[0].value);
            const categoryMax = Object.values(categoryData).flat().reduce((acc, curr) => Math.max(acc, curr.value), Object.values(categoryData).flat()[0].value);
            const categoryAvg = (categoryTotal / Object.values(categoryData).flat().length).toFixed(2);

            const roundedCategoryTotal = categoryTotal.toFixed(2);
            const roundedCategoryMin = categoryMin.toFixed(2);
            const roundedCategoryMax = categoryMax.toFixed(2);

            output += `  Category: ${category}, Total: ${roundedCategoryTotal}, Min: ${roundedCategoryMin}, Max: ${roundedCategoryMax}, Avg: ${categoryAvg}\n`;

            // Subcategory-level calculations
            for (const subcategory in categoryData) {
                const subcategoryData = categoryData[subcategory];

                const subcategoryTotal = subcategoryData.reduce((acc, curr) => acc + curr.value, 0);
                const subcategoryMin = subcategoryData.reduce((acc, curr) => Math.min(acc, curr.value), subcategoryData[0].value);
                const subcategoryMax = subcategoryData.reduce((acc, curr) => Math.max(acc, curr.value), subcategoryData[0].value);
                const subcategoryAvg = (subcategoryTotal / subcategoryData.length).toFixed(2);

                const roundedSubcategoryTotal = subcategoryTotal.toFixed(2);
                const roundedSubcategoryMin = subcategoryMin.toFixed(2);
                const roundedSubcategoryMax = subcategoryMax.toFixed(2);

                output += `    Subcategory: ${subcategory}, Total: ${roundedSubcategoryTotal}, Min: ${roundedSubcategoryMin}, Max: ${roundedSubcategoryMax}, Avg: ${subcategoryAvg}\n`;
            }
        }

        return output.trim(); // Remove trailing newline
    }
}

type DataRecord = {
    id: number;
    category: string;
    subcategory: string;
    value: number;
    timestamp: Date;
}
