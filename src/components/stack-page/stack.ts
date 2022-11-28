
export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    toArray: () => T[];
}

export class Stack<T> implements IStack<T> {
    private _container: T[] = [];

    //возвращает значения, которые хранятся в стеке
    toArray = () => this._container;

    //возвращает текущий размер стека
    get size() {
        return this._container.length;
    }

    push = (item: T) => {
        this._container.push(item);
    };

    pop = () => {
        this._container.pop();
    };

    clear = (): void => {
        this._container = [];
    };

}