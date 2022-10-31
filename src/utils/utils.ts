import { TArray } from "../components/string/string";

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const swap = (arr: TArray[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};