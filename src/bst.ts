class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
      this.value = value;
      this.left = null;
      this.right = null;
  }
}

export class BinarySearchTree<T> {
  root: TreeNode<T> | null;
  insertCount: number;
  searchCount: number;
  traversalCount: number;
  maxDepth: number;

  constructor(maxDepth: number = 1000) {
      this.root = null;
      this.insertCount = 0;
      this.searchCount = 0;
      this.traversalCount = 0;
      this.maxDepth = maxDepth;
  }

  insert(value: T): void {
      this.insertCount++;
      const newNode = new TreeNode(value);
      if (this.root === null) {
          this.root = newNode;
      } else {
          this.insertNode(this.root, newNode, 0);
      }
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>, depth: number): void {
      if (depth > this.maxDepth) {
          throw new Error(`Maximum depth of ${this.maxDepth} exceeded`);
      }

      if (newNode.value < node.value) {
          if (node.left === null) {
              node.left = newNode;
          } else {
              this.insertNode(node.left, newNode, depth + 1);
          }
      } else {
          if (node.right === null) {
              node.right = newNode;
          } else {
              this.insertNode(node.right, newNode, depth + 1);
          }
      }
  }

  search(value: T): boolean {
      this.searchCount++;
      return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | null, value: T): boolean {
      if (node === null) {
          return false;
      }
      if (value < node.value) {
          return this.searchNode(node.left, value);
      } else if (value > node.value) {
          return this.searchNode(node.right, value);
      } else {
          return true;
      }
  }

  inOrderTraversal(node: TreeNode<T> | null = this.root, result: T[] = []): T[] {
      if (node !== null) {
          this.inOrderTraversal(node.left, result);
          result.push(node.value);
          this.traversalCount++;
          this.inOrderTraversal(node.right, result);
      }
      return result;
  }

  preOrderTraversal(node: TreeNode<T> | null = this.root, result: T[] = []): T[] {
      if (node !== null) {
          result.push(node.value);
          this.traversalCount++;
          this.preOrderTraversal(node.left, result);
          this.preOrderTraversal(node.right, result);
      }
      return result;
  }

  postOrderTraversal(node: TreeNode<T> | null = this.root, result: T[] = []): T[] {
      if (node !== null) {
          this.postOrderTraversal(node.left, result);
          this.postOrderTraversal(node.right, result);
          result.push(node.value);
          this.traversalCount++;
      }
      return result;
  }
}