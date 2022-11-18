export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}


interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    /*     addByIndex: () => void;
        deleteByIndex: () => void;
        deleteHead: () => void;
        deleteTail: () => void;
        toArray: () => number; */

}

export class LinkedList<T> implements ILinkedList<T> {
    /*     private container: (T | null)[] = []; */
    private head: Node<T> | null;
    private tail: Node<T> | null;
    /* private size: number; */
    /*     private readonly size: number = 0;
        private length: number = 0; */

    constructor(elements: T[]) {
        this.head = null;
        this.tail = null;
        /* this.size = 0; */
        /*  this.container = Array(size); */
    }

    prepend = (element: T) => {

    }

    append = (element: T) => {
        /* const node = new Node(element) */
    }

    /* addByIndex: () => {
    
    }
    deleteByIndex: () => {
    
    }
    deleteHead: () => {
    
    }
    deleteTail: () => {
    
    }
    
    toArray: () => {
    
    } */
}