class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.right = null;
		this.left = null;
	}

	appendChild(node) {
		if (this.left === null) {
			node.parent = this;
			this.left = node;
		} else if (this.right === null) {
			node.parent = this;
			this.right = node;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			node.parent = null;
			this.left = null;
		} else if (this.right === node) {
			node.parent = null;
			this.right = null;
		} else {
			throw new Error();
		}
	}

	remove() {
		if (this.parent === null) {return;}
		else {
			return this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent !== null) {

			// change parent of current node childs to parent of current node
			if (this.left !== null) { this.left.parent = this.parent };
			if (this.right !== null) { this.right.parent = this.parent };

			// check if current node is left child of his parent
			if (this.parent.left === this) {

				// update parent of right child of a parent
				if (this.parent.right !== null) { this.parent.right.parent = this; };

				// store value of parent right
				let parentRight = this.parent.right;

				// update parent and current childs
				this.parent.left = this.left;
				this.parent.right = this.right;
				this.left = this.parent;
				this.right = parentRight;
			}

			// check if current node is right child of his parent
			if (this.parent.right === this) {
				if (this.parent.left !== null) { this.parent.left.parent = this; }

				// store value of parent left
				let parentleft = this.parent.left;

				// update parent and current childs
				this.parent.left = this.left;
				this.parent.right = this.right;
				this.right = this.parent;
				this.left = parentleft;
			}

			// update parent.parent of current node if exists
			if (this.parent.parent !== null) {
				if (this.parent === this.parent.parent.left) {
					this.parent.parent.left = this;
				}
				if (this.parent === this.parent.parent.right) {
					this.parent.parent.right = this;
				}
			}

			// replace parent.parent and parent
			// store value of parent.parent
			let parentParent = this.parent.parent;

			this.parent.parent = this;
			this.parent = parentParent;
		}
	}
}

module.exports = Node;
