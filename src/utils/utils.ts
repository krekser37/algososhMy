import { ElementStates } from "../types/element-states";

export type TArray = {
    value?: string | undefined;
    color: ElementStates;
};

export type TArraySort = {
    state: number;
    color: ElementStates;
};

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const swap = (arr: TArray[] | TArraySort[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

