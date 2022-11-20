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

    /*     addByIndex: () => void;
        deleteByIndex: () => void;
        
        
        toArray: () => number; */

    /*  size: number; */

}

export class LinkedList<T> implements ILinkedList<T> {
    private container: (T | null)[] = [];
    private head: Node<T> | null;
    private tail: Node<T> | null;
    length: number;
    /*     private readonly size: number = 0;
        private length: number = 0; */

    constructor(randomArr: T[]) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        randomArr.forEach((item) => {
            this.append(item)
        })
    }

    /* Добавить в конец */
    append = (value: T) => {
        const node = new Node(value);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
        }
        this.tail.next = node;
        this.tail = node;
        this.length++;
    }

    /* Добавить в начало */
    prepend = (value: T) => {
        const node = new Node(value);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
        }
        this.head.next = node;
        this.head = node;
        this.length++;
    }

    deleteHead = () => {
        if (!this.head) {
            return null;
        }
        this.head = this.head.next;
        this.length--;
    }

    deleteTail= () => {
        if (!this.tail) {
            return null;
        }
        let curr = this.head;
        while (curr?.next?.next) {
            curr = curr.next;
            curr.next = null;
        }
        this.length--;
    }
    /* addByIndex: () => {
    
    }
    deleteByIndex: () => {
    
    }


     */
    toArray() {
        let curr = this.head;
        let res: T[] = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        console.log(res);
        return res;
    }

    /*  get size() {return this.length}; */

}