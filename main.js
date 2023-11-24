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

    // helper method to find the smallest value in the tree
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
    
    inOrderTraversal(node = this.root, array = []) {
        if (node !== null) {
            this.inOrderTraversal(node.left, array);
            array.push(node.data);
            this.inOrderTraversal(node.right, array);
            if (array) return array;
        }
    }

    // Queue: First In First Out
    levelOrder(callback) {
        if (this.root === null) return [];

        const queue = [this.root];
        const results = [];

        while (queue.length > 0) {
            const node = queue.shift();

            if (callback) {
                callback(node);
            } else {
                results.push(node.data);
            }

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        return callback ? undefined : results;
    }

    postOrder(node = this.root) {
        if (node === null) return node;
        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.data);
    }

    preOrder(node = this.root, callback) {
        if (node === null) return node;
        console.log(node.data);
        this.preOrder(node.left);
        this.preOrder(node.right);
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

    height(node) {
        if (node === null) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        let current = this.root;
        let depth = 0;
        while (current) {
            if (current.data === node) return depth;
            if (node < current.data) {
                current = current.left;
                depth++;
            } else {
                current = current.right;
                depth++;
            }
        }
        return null;
    }

    isBalanced(root = this.root) {
        if (root == null) return false;

        let left = root.left;
        let right = root.right;

        if (Math.abs(this.height(left) - this.height(right)) > 1) {
            console.log(false);
        } else {
            console.log(true);
        }
    }

    rebalance() {
        const inOrder = this.inOrderTraversal();
        this.root = this.buildTree(inOrder, 0, inOrder.length - 1);
    }
}

let orderedArray = [20, 30, 40, 50, 60, 70, 80];
let newTree = new Tree(orderedArray);

    // prettyPrint method consoles the new tree after insertion.
// newTree.insert(90);
// newTree.prettyPrint();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // prettyPrint method consoles the new tree after deletion.
// newTree.delete(50);
// newTree.prettyPrint();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// console.log(newTree.inOrderTraversal());
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// console.log(newTree.levelOrder());
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// console.log(newTree.postOrder());
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// console.log(newTree.preOrder());
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// console.log(newTree.depth(70));
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Find the node you are wanting the height of then pass it into the height() method.
// const value = newTree.find(30) 
// console.log(newTree.height(value));
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// console.log(newTree.isBalanced());
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // insert more nodes to tree to unbalance it
// newTree.insert(90);
// newTree.insert(100);
    // view the unbalanced tree
// newTree.prettyPrint();
    // verify the tree is unbalanced
// newTree.isBalanced();
// newTree.rebalance();
    // view the newly balanced tree
// newTree.prettyPrint();
    // verify the tree is balanced
// newTree.isBalanced();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~