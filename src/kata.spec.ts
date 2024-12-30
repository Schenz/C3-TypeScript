import { Kata } from './kata';
import * as fs from 'fs';

let fixture: Kata;
const testInput1 = {
    name: 'testInput1',
    value: `ID,Category,Subcategory,Value,Timestamp
1,Fruit,Apple,74.41,2024-01-23T06:58:00`};
const testOutput1 = {
    name: 'testOutput1',
    value: `Overall: Total: 74.41, Min: 74.41, Max: 74.41, Avg: 74.41
  Category: Fruit, Total: 74.41, Min: 74.41, Max: 74.41, Avg: 74.41
    Subcategory: Apple, Total: 74.41, Min: 74.41, Max: 74.41, Avg: 74.41`};
const testInput2 = {
    name: 'testInput2',
    value: `ID,Category,Subcategory,Value,Timestamp
1,Fruit,Apple,74.41,2024-01-23T06:58:00
2,Fruit,Apple,37.20,2024-01-24T06:58:00`};
const testOutput2 = {
    name: 'testOutput2',
    value: `Overall: Total: 111.61, Min: 37.20, Max: 74.41, Avg: 55.80
  Category: Fruit, Total: 111.61, Min: 37.20, Max: 74.41, Avg: 55.80
    Subcategory: Apple, Total: 111.61, Min: 37.20, Max: 74.41, Avg: 55.80`};
const testInput3 = {
    name: 'testInput3',
    value: `ID,Category,Subcategory,Value,Timestamp
1,Fruit,Apple,74.41,2024-01-23T06:58:00
2,Fruit,Apple,37.20,2024-01-24T06:58:00
3,Fruit,Berry,30.02,2024-02-27T05:17:00`};
const testOutput3 = {
    name: 'testOutput3',
    value: `Overall: Total: 141.63, Min: 30.02, Max: 74.41, Avg: 47.21
  Category: Fruit, Total: 141.63, Min: 30.02, Max: 74.41, Avg: 47.21
    Subcategory: Apple, Total: 111.61, Min: 37.20, Max: 74.41, Avg: 55.80
    Subcategory: Berry, Total: 30.02, Min: 30.02, Max: 30.02, Avg: 30.02`};
const testInput4 = {
    name: 'testInput4',
    value: `ID,Category,Subcategory,Value,Timestamp
1,Fruit,Apple,74.41,2024-01-23T06:58:00
2,Fruit,Apple,37.20,2024-01-24T06:58:00
3,Fruit,Berry,30.02,2024-02-27T05:17:00
4,Vegetable,Spinach,73.91,2024-03-02T14:16:00`};
const testOutput4 = {
    name: 'testOutput4',
    value: `Overall: Total: 215.54, Min: 30.02, Max: 74.41, Avg: 53.88
  Category: Fruit, Total: 141.63, Min: 30.02, Max: 74.41, Avg: 47.21
    Subcategory: Apple, Total: 111.61, Min: 37.20, Max: 74.41, Avg: 55.80
    Subcategory: Berry, Total: 30.02, Min: 30.02, Max: 30.02, Avg: 30.02
  Category: Vegetable, Total: 73.91, Min: 73.91, Max: 73.91, Avg: 73.91
    Subcategory: Spinach, Total: 73.91, Min: 73.91, Max: 73.91, Avg: 73.91`};

beforeEach(() => {
    fixture = new Kata();
});

describe('Kata Tests', () => {
    it.each`
        input           | expected
        ${testInput1}   | ${testOutput1}
        ${testInput2}   | ${testOutput2}
        ${testInput3}   | ${testOutput3}
        ${testInput4}   | ${testOutput4}
    `(
        'returns $expected.name when $input.name is passed to function',
        ({ input, expected }) => {
            expect(fixture.getCategoryAnalytics(input.value)).toEqual(expected.value);
        }
    );

    it('real data', () => {
        const realData = fs.readFileSync('dataset.csv', 'utf-8');
        const expectedResults = `Overall: Total: 499999.09, Min: 1.00, Max: 99.99, Avg: 50.03
  Category: Fruit, Total: 103558.85, Min: 1.00, Max: 99.98, Avg: 51.24
    Subcategory: Apple, Total: 20154.74, Min: 1.00, Max: 99.86, Avg: 51.28
    Subcategory: Berry, Total: 20768.54, Min: 1.54, Max: 99.98, Avg: 51.41
    Subcategory: Orange, Total: 21633.93, Min: 1.05, Max: 99.74, Avg: 49.96
    Subcategory: Banana, Total: 19971.65, Min: 1.14, Max: 99.69, Avg: 53.12
    Subcategory: Grape, Total: 21029.99, Min: 2.14, Max: 99.92, Avg: 50.67
  Category: Vegetable, Total: 98589.21, Min: 1.05, Max: 99.99, Avg: 50.02
    Subcategory: Spinach, Total: 19735.91, Min: 1.29, Max: 99.35, Avg: 49.71
    Subcategory: Broccoli, Total: 17305.17, Min: 1.85, Max: 99.99, Avg: 49.44
    Subcategory: Tomato, Total: 19779.30, Min: 1.25, Max: 99.84, Avg: 51.37
    Subcategory: Pepper, Total: 21900.49, Min: 1.22, Max: 99.87, Avg: 51.65
    Subcategory: Carrot, Total: 19868.34, Min: 1.05, Max: 99.79, Avg: 47.88
  Category: Protein, Total: 101087.19, Min: 1.01, Max: 99.93, Avg: 50.32
    Subcategory: Chicken, Total: 19437.05, Min: 1.14, Max: 99.57, Avg: 49.97
    Subcategory: Tofu, Total: 20622.25, Min: 1.41, Max: 99.34, Avg: 50.54
    Subcategory: Fish, Total: 18950.73, Min: 1.26, Max: 99.33, Avg: 49.74
    Subcategory: Beef, Total: 20452.07, Min: 1.71, Max: 99.86, Avg: 51.00
    Subcategory: Egg, Total: 21625.09, Min: 1.01, Max: 99.93, Avg: 50.29
  Category: Dairy, Total: 99515.93, Min: 1.01, Max: 99.96, Avg: 50.13
    Subcategory: Milk, Total: 18009.57, Min: 1.01, Max: 99.50, Avg: 51.02
    Subcategory: Yogurt, Total: 20270.41, Min: 1.80, Max: 99.67, Avg: 50.55
    Subcategory: Butter, Total: 20072.56, Min: 1.07, Max: 99.96, Avg: 49.32
    Subcategory: Cream, Total: 21006.91, Min: 1.14, Max: 99.91, Avg: 50.38
    Subcategory: Cheese, Total: 20156.48, Min: 1.06, Max: 99.94, Avg: 49.52
  Category: Grain, Total: 97247.91, Min: 1.07, Max: 99.80, Avg: 48.45
    Subcategory: Oats, Total: 20380.92, Min: 1.33, Max: 99.68, Avg: 49.59
    Subcategory: Barley, Total: 17183.42, Min: 1.46, Max: 99.67, Avg: 48.82
    Subcategory: Wheat, Total: 20068.05, Min: 1.12, Max: 99.64, Avg: 48.95
    Subcategory: Rice, Total: 18809.94, Min: 1.07, Max: 99.80, Avg: 46.10
    Subcategory: Corn, Total: 20805.58, Min: 1.07, Max: 99.78, Avg: 48.84`;
        expect(fixture.getCategoryAnalytics(realData)).toEqual(expectedResults);
    });
});
