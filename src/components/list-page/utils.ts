export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    append: (element: T) => void; /* Добавить в конец */
    prepend: (element: T) => void; /* Добавить в начало */
    deleteHead: () => void;
    deleteTail: () => void;
    addByIndex: (element: T, index: number | undefined) => void;
    deleteByIndex: (index: number) => void;
    getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
    // private container: (T | null)[] = [];
    private head: Node<T> | null;
    private tail: Node<T> | null;
    length: number;

    constructor(randomArr?: T[]) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        if (randomArr && randomArr.length > 0) {
            randomArr?.forEach((item) => {
                this.append(item)
            })
        }
    }

    /* Добавить в конец */
    append = (value: T) => {
        const node = new Node(value);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            return this;
        }
        this.tail.next = node;
        this.tail = node;
        this.length++;
        return this;
    }

    /* Добавить в начало */
    prepend = (value: T) => {
        const node = new Node(value);
        if (!this.head || !this.tail) {
            this.head = node;
            this.head.next = null;
            this.tail = node;
        }
        node.next = this.head;
        this.head = node;
        //  this.length++;
    }

    deleteHead = () => {
        if (!this.head) {
            return null;
        }
        const delNode = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        this.length--;
        return delNode;
    }

    deleteTail = () => {
        if (!this.tail) {
            return null;
        }
        let delNode = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return delNode;
        }
        let currNode = this.head;
        while (currNode?.next) {
            if (!currNode?.next.next) {
                this.tail = currNode;
                currNode.next = null;
            } else {
                currNode = currNode.next;
            }
        }
        this.length--;
    }

    addByIndex = (element: T, index: number | undefined) => {
        if (index) {
            /*   if (index < 0 || index > this.length) {
                   console.log('Enter a valid index');
                   return;
               } else {*/
            const addNode = new Node(element);
            if (index !== 0) {
                addNode.next = this.head;
                this.head = addNode;
                this.length++;
            } else {
                console.log(index);

                let curr = this.head;
                let currIndex = 0;
                // перебрать элементы в списке до нужной позиции
                while (currIndex < index) {
                    currIndex++;
                    if (curr?.next && currIndex !== index) {
                        curr = curr?.next;
                    }
                }
                if (curr) {
                    addNode.next = curr.next;
                    curr.next = addNode;
                }

            }

        }

    }
    deleteByIndex = (index: number) => {
        let curr = this.head;
        let previous = curr;
        if (previous && curr) {
            if (curr === this.head) {
                this.head = this.head.next;
            } else if (curr === this.tail) {
                previous.next = null;
                this.tail = previous;
            } else {
                previous.next = curr.next;
            }
        }
        this.length--;
    }


    toArray() {
        let curr = this.head;
        let res: T[] = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res;
    }

    getSize = () => this.length;
}