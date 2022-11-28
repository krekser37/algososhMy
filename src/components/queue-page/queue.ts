interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    clear: () => void;
    getTail: () => number;
    getHead: () => number;
    isFull: () => boolean;
    getSize: () => number;
    toArray: () => (T | null)[];
}
export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size).fill(null);
    }

    toArray() { return this.container };

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        if (!this.isEmpty()) {
            this.tail++;
        }
        this.container[this.tail] = item;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        this.container[this.head] = null;
        this.length--;

        if (this.head !== this.size - 1) {
            if (this.head !== this.tail) {
                this.head++;
            }
        }
    };

    getTail = () => {
        return this.tail;
    };

    getHead = () => {
        return this.head;
    };

    getSize = () => this.container.length;

    isEmpty = () => this.length === 0;

    isFull = () => this.tail >= this.size - 1;

    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = Array(this.size).fill(null);
    };
}