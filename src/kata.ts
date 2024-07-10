import fetch from "node-fetch";

export class Kata {
    public async getWeatherData(days: number): Promise<number> {
        var startDate = new Date(2023, 0, 1);
        const batchSize = 10;
        const temps = [];

        for (let i = 0; i < days; i += batchSize) {
            const batchPromises = [];

            for (let j = 0; j < batchSize && i + j < days; j++) {
                const index = i + j;
                const dateToCheck: Date = new Date(startDate.getTime() + ((1000 * 60 * 60 * 24) * index));
                console.log(dateToCheck.toISOString().split(`T`)[0]);

                const promise = fetch(`https://c3weatherapi.azurewebsites.net/${dateToCheck.toISOString().split(`T`)[0]}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'api-key': 'schenzethan3'
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error! status: ${response.status}`);
                    }
                    return response.json() as Promise<WeatherData>;
                })
                .then(result => result.TempMaximum)
                .catch(error => {
                    if (error instanceof Error) {
                        console.log('error message: ', error.message);
                    } else {
                        console.log('unexpected error: ', error);
                    }
                    return null; // Return null or some default value in case of error
                });

                batchPromises.push(promise);
            }

            const batchResults = await Promise.all(batchPromises);
            temps.push(...batchResults);
        }

        const validTemps = temps.filter(temp => temp !== null) as number[];
        
        if (validTemps.length === 0) {
            throw new Error("No valid temperature data available.");
        }

        const sum = validTemps.reduce((a: number, b: number) => a + b, 0);
        const average = sum / validTemps.length;

        // Return the average rounded to a single decimal point
        return parseFloat(average.toFixed(1));  
    }
}

type WeatherData = {
    Date: string;
    TempAverage: number;
    TempMaximum: number;
    TempMinimum: number;
    Precipitation: number;
    Snow: number | null;
    SnowDepth: number | null;
}
