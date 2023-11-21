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

let orderedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let newTree = new Tree(orderedArray);

newTree.insert(11);
newTree.prettyPrint();