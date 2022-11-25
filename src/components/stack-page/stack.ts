export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    /*     peak: () => T | null; */
    clear: () => void;
    /*     getSize: () => number;
        getElements: () => T[]; */
}

export class Stack<T> implements IStack<T> {
    private _cont: Record<number, T> = {};
    /* Record<Keys, Type> Создает тип объекта, ключами свойств которого являются Keys, 
    а значениями свойств являются Type. Эту утилиту можно использовать для отображения 
    свойств одного типа на другой тип. */
    private _size = 0;

    private _container: T[] = [];

    //возвращает значения, которые хранятся в стеке
    get item() {
        return Object.values(this._cont);
        /*    return this._size-1 */
    }

    //возвращает текущий размер стека
    get size() {
        return this._size;
    }

    push = (item: T) => {
        const size = this._size++;
        this._cont[size] = item;

        //this._container.push(item);
    };

    pop = () => {
        const size = this._size;
        let deleteItem = this._cont[size];
        delete this._cont[size];
        this._size--;
        return deleteItem;

        /*  this._container.pop(); */
    };

    /*     peak = (): T | null => {
            if (this.getSize() !== 0) {
                return this.container[this.getSize() - 1];
            } else {
                return null;
            }
        }; */

    clear = (): void => {
        this._size = 0;
        this._cont = {}
        //this.container = [];
    };

    /*     getSize = () => this.container.length;
    
        getElements = () => {
            return this.container;
        }; */
}