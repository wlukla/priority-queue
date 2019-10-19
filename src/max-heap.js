const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.size;
	}

	newParentNodes() {
		this.parentNodes = [];
		this.updateParentNodes(this.root);
		// this.sortParentNodes();
	}

	updateParentNodes(node) {
		if (node.left === null || node.right == null) { this.parentNodes.push(node) }

		if (node.left) {
			this.updateParentNodes(node.left);
		}
		if (node.right) {
			this.updateParentNodes(node.right);
		}
	}

	sortParentNodes() {
		let depthArr = this.getParentNodesDepth();
		let parentNodesArr = this.parentNodes;

		for (let i = 0; i < depthArr.length; i++) {
			let tempArr = depthArr.slice(i, depthArr.length);
			let max = Math.max.apply(Math, tempArr);
			let maxIndex = tempArr.indexOf(max) + i;

			parentNodesArr.unshift(parentNodesArr[maxIndex]);
			parentNodesArr.splice(maxIndex + 1, 1);

			depthArr.unshift(depthArr[maxIndex]);
			depthArr.splice(maxIndex + 1, 1);
		}

		this.parentNodes = parentNodesArr;
	}

	getDepth(node) {
		let current = node;
		let depth = 0;
		while (current.parent !== null) {
			depth++;
			current = current.parent;
		}
		return depth;
	}

	getParentNodesDepth() {
		let parentNodesDepth = [];
		this.parentNodes.forEach(node => {
			parentNodesDepth.push(this.getDepth(node));
		})
		return parentNodesDepth;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.size++;
	}

	pop() {
		this.detachRoot();
	}

	detachRoot() {
		let detachedRoot = this.root;
		if (this.parentNodes.indexOf(this.root) !== -1) {
			this.parentNodes.shift();
		}
		this.root = null;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];

		if(lastInsertedNode.parent !== null && lastInsertedNode.parent.left === lastInsertedNode) {
			lastInsertedNode.parent.left = null;
		}
		if(lastInsertedNode.parent !== null && lastInsertedNode.parent.right === lastInsertedNode) {
			lastInsertedNode.parent.right = null;
		}

		this.root = lastInsertedNode;

		if(detached.left !== null ) { detached.left.parent = lastInsertedNode; }
		if(detached.right !== null) { detached.right.parent = lastInsertedNode; }

		lastInsertedNode.left = detached.left;
		lastInsertedNode.right = detached.right;

		this.newParentNodes();
	}

	size() {

	}

	isEmpty() {
		if (this.root === null) {
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		this.parentNodes.push(node);
		if (this.root === null) {
			this.root = node;
		} else {
			let tempParent = this.parentNodes[0]
			tempParent.appendChild(node);
			// if tempParent has both childs remove from parentNodes
			if (tempParent.left !== null && tempParent.right !== null) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent === null) {
			this.root = node;
			return;
		}

		let nodeIndex = this.parentNodes.indexOf(node);
		let parentIndex = this.parentNodes.indexOf(node.parent);

		if (nodeIndex >= 0) { this.parentNodes[nodeIndex] = node.parent }
		if (parentIndex >= 0) { this.parentNodes[parentIndex] = node }

		node.swapWithParent();
		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
	}
}

module.exports = MaxHeap;
