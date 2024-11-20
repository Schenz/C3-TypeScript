import { BinarySearchTree } from './bst'; // Adjust the import path as necessary
import * as fs from 'fs';
import * as path from 'path';

describe('BinarySearchTree', () => {
    let bst: BinarySearchTree<number>;

    beforeEach(() => {
        bst = new BinarySearchTree<number>();
    });

    test('should insert nodes correctly and update insertCount', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);

        expect(bst.insertCount).toBe(5);
    });

    test('should search nodes correctly and update searchCount', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);

        bst.search(10);
        bst.search(5);
        bst.search(20);

        expect(bst.searchCount).toBe(3);
    });

    test('should perform in-order traversal correctly and update traversalCount', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);

        const result = bst.inOrderTraversal();
        expect(result).toEqual([3, 5, 7, 10, 15]);
        expect(bst.traversalCount).toBe(5);
    });

    test('should perform pre-order traversal correctly and update traversalCount', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);

        const result = bst.preOrderTraversal();
        expect(result).toEqual([10, 5, 3, 7, 15]);
        expect(bst.traversalCount).toBe(5);
    });

    test('should perform post-order traversal correctly and update traversalCount', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);

        const result = bst.postOrderTraversal();
        expect(result).toEqual([3, 7, 5, 15, 10]);
        expect(bst.traversalCount).toBe(5);
    });
});

describe('BinarySearchTree with large data sets', () => {
    let bst: BinarySearchTree<string>;

    beforeEach(() => {
        bst = new BinarySearchTree<string>();
    });

    const loadNamesFromFile = (filePath: string): string[] => {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data.split('\n').filter(name => name.trim() !== '');
    };

    test('should insert and traverse random names correctly', () => {
        const randomNamesPath = path.join(__dirname, 'random-names.txt');
        const randomNames = loadNamesFromFile(randomNamesPath);

        randomNames.forEach(name => bst.insert(name));

        const result = bst.inOrderTraversal();
        const sortedNames = [...randomNames].sort();
        expect(result).toEqual(sortedNames);
        expect(bst.insertCount).toBe(randomNames.length);
    });

    xtest('should insert and traverse sorted names correctly', () => {
        const sortedNamesPath = path.join(__dirname, 'sorted-names.txt');
        const sortedNames = loadNamesFromFile(sortedNamesPath);

        sortedNames.forEach(name => bst.insert(name));

        const result = bst.inOrderTraversal();
        expect(result).toEqual(sortedNames);
        expect(bst.insertCount).toBe(sortedNames.length);
    });
});
