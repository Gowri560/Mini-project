class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertAtBeginning(value) {
        let newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.display();
        this.showAlgorithm("insertAtBeginning");
    }

    insertAtEnd(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let temp = this.head;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
        this.display();
        this.showAlgorithm("insertAtEnd");
    }

    insertAtPosition(value, position) {
        if (position < 1) return;

        let newNode = new Node(value);
        if (position === 1) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let temp = this.head;
            let prev = null;
            let index = 1;
            while (temp && index < position) {
                prev = temp;
                temp = temp.next;
                index++;
            }
            if (!prev) return;
            newNode.next = temp;
            prev.next = newNode;
        }
        this.display();
        this.showAlgorithm("insertAtPosition");
    }

    deleteFromBeginning() {
        if (!this.head) return;
        this.head = this.head.next;
        this.display();
        this.showAlgorithm("deleteFromBeginning");
    }

    deleteFromEnd() {
        if (!this.head) return;
        if (!this.head.next) {
            this.head = null;
        } else {
            let temp = this.head;
            while (temp.next.next) {
                temp = temp.next;
            }
            temp.next = null;
        }
        this.display();
        this.showAlgorithm("deleteFromEnd");
    }

    deleteAtPosition(position) {
        if (position < 1 || !this.head) return;

        if (position === 1) {
            this.head = this.head.next;
        } else {
            let temp = this.head;
            let prev = null;
            let index = 1;
            while (temp && index < position) {
                prev = temp;
                temp = temp.next;
                index++;
            }
            if (!prev || !temp) return;
            prev.next = temp.next;
        }
        this.display();
        this.showAlgorithm("deleteAtPosition");
    }

    search(value) {
        let temp = this.head;
        while (temp) {
            if (temp.value == value) {
                this.highlightNode(temp.value);
                this.showAlgorithm("search");
                return;
            }
            temp = temp.next;
        }
        alert("Node not found!");
    }

    highlightNode(value) {
        const nodes = document.querySelectorAll(".node");
        nodes.forEach(node => {
            if (node.textContent == value) {
                node.classList.add("highlight");
                setTimeout(() => node.classList.remove("highlight"), 1000);
            }
        });
    }

    display() {
        const container = document.getElementById("listContainer");
        container.innerHTML = "";
        let temp = this.head;
        while (temp) {
            const nodeDiv = document.createElement("div");
            nodeDiv.classList.add("node");
            nodeDiv.textContent = temp.value;
            container.appendChild(nodeDiv);
            temp = temp.next;
        }
    }

    showAlgorithm(type) {
        const algorithms = {
            insertAtBeginning: "Insert at Beginning:\nnewNode.next = head\nhead = newNode",
            insertAtEnd: "Insert at End:\ntemp = head\nwhile (temp.next): temp = temp.next\ntemp.next = newNode",
            insertAtPosition: "Insert at Position:\nfind position\nprev.next = newNode\nnewNode.next = temp",
            deleteFromBeginning: "Delete from Beginning:\nhead = head.next",
            deleteFromEnd: "Delete from End:\nfind last node\ndelete it",
            deleteAtPosition: "Delete at Position:\nfind position\nprev.next = temp.next",
            search: "Search:\nwhile (temp):\n  if temp.value == key: return temp\n  temp = temp.next"
        };
        document.getElementById("algorithm").textContent = algorithms[type];
    }
}

const list = new LinkedList();

function insertAtBeginning() {
    list.insertAtBeginning(document.getElementById("nodeValue").value);
}

function insertAtEnd() {
    list.insertAtEnd(document.getElementById("nodeValue").value);
}

function insertAtPosition() {
    let pos = prompt("Enter position:");
    list.insertAtPosition(document.getElementById("nodeValue").value, parseInt(pos));
}

function deleteFromBeginning() {
    list.deleteFromBeginning();
}

function deleteFromEnd() {
    list.deleteFromEnd();
}

function deleteAtPosition() {
    let pos = prompt("Enter position:");
    list.deleteAtPosition(parseInt(pos));
}

function searchNode() {
    list.search(document.getElementById("nodeValue").value);
}
