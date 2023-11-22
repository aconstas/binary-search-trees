class Node {
    constructor(value) {
        this.data = value;
        this.right = null;
        this.left = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array, 0, array.length - 1);
        this.prettyPrint();
    }
    buildTree(array, start, end) {
        if (start > end) return null;
        let mid = parseInt((start + end) / 2);
        var node = new Node(array[mid]);

        node.left = this.buildTree(array, start, mid - 1);
        node.right = this.buildTree(array, mid + 1, end);

        return node;
    }

    insert(value) {
        let current = this.root;
        const newNode = new Node(value);

        if (!current) {
            this.root = newNode;
            return;
        }

        while (true) {
            if (value > current.data) {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            } else if (value < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            }
        }
    }

    delete(value) {
        this.deleteRecursive(this.root, value)
    }

    deleteRecursive(root, value) {
        if (root === null) return root;
        if (value < root.data) {
            root.left = this.deleteRecursive(root.left, value);
        } else if (value > root.data) {
            root.right = this.deleteRecursive(root.right, value);
        } else {
            // Node with only one child or no child
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            // Node with two children: Get the inorder successor (smallest in the right subtree)
            root.data = this.minValue(root.right);
            // Delete the inorder successor
            root.right = this.deleteRecursive(root.right, root.data);
        }
        return root;
    }

    // helper method to find the samllest value in the tree
    minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    find(value) {
        if (this.root === null) return this.root;
        let current = this.root;
        while (current) {
            if (current.data === value) {
                return current;
            }
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }
    

    // prettyPrint method for visualizing the balanced BST in the console.
    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}

let orderedArray = [20, 30, 40, 50, 60, 70, 80];
let newTree = new Tree(orderedArray);

// newTree.insert(11);
// newTree.prettyPrint();

// newTree.delete(50);
// newTree.prettyPrint();

console.log(newTree.find(60));