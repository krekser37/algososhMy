export class LinkedListNode<T> {
    _value: T
    next: LinkedListNode<T> | null
    constructor(value: T, next?: LinkedListNode<T> | null) {
        this._value = value;
        this.next = (next === undefined ? null : next);
    }
}


/* interface ILinkedList<T> {
//Добавить в конец
    append: (element: T) => void; 
    //Добавить в начало
    prepend: (element: T) => void; 
    deleteHead: () => void;
    deleteTail: () => void;
    addByIndex: (element: T, index: number | undefined) => void;
    deleteByIndex: (index: number) => void;
} */

export class LinkedList<T> /*implements ILinkedList<T> */ {
    //private container: (T | null)[] = [];
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
   /*  length: number; */

    constructor(defaultValues?: T[]) {
        this.head = null;
        this.tail = null;
        /* this.length = 0; */
        defaultValues?.forEach((value) => {
            this.append(value)
        })
    }

    /* Добавить в конец */
    append (value: T) {
        const node = new LinkedListNode(value);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            return this;
        }
        this.tail.next = node;
        this.tail = node;
        /* this.length++; */
        return this;
    }

    /* Добавить в начало */
    prepend (value: T)  {
        const node = new LinkedListNode(value, this.head);
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
        return this;
    }

    deleteHead ():LinkedListNode<T>|null  {
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
      /*   this.length--; */
        return delNode;
    }

    deleteTail () {
        if (!this.tail) {
            return null;
        }
        const delNode = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return delNode;
        }
        //ищем предпоследний элемент, чтобы у него занулить next
        let currNode = this.head;
        while (currNode?.next) {
            if (!currNode?.next.next) {
                this.tail = currNode;//предпоследний элемент становится последним
                currNode.next = null;// у предпоследнего элемента следующий становится null
            } else {
                currNode = currNode.next;
            }
        }
       /*  this.length--; */
    }

/*     addByIndex = (element: T, index: number | undefined) => {
        if (index) {
            if (index < 0 || index > this.length) {
                console.log('Enter a valid index');
                return;
            } else {
                const addNode = new LinkedListNode(element);
                if (index === 0) {
                    addNode.next = this.head;
                    this.head = addNode;
                } else {
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
                    this.length++;
                }
            }
        } 

    }*/
/*     deleteByIndex = (index: number) => {
        if (index >= 0 && index < this.length && this.head) {
            let curr = this.head;
            let previous = curr;
            let currIndex = 0;
            if (index === 0) {
                this.head = curr.next;
            } else {
                while (currIndex < index) {
                    currIndex++
                    if (curr.next) {
                        previous = curr;
                        curr = curr.next;
                    }
                }
                previous.next = curr.next;
            }
            this.length--;
        }
    } */

    toArray() {
        let curr = this.head;
        let res/* : T[] */ = [];
        while (curr) {
            res.push(curr);
            curr = curr.next;
        }
        return res;
    }

}