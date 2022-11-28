import { ElementStates } from "../../types/element-states";
import { randomNumber, TArraySort } from "../../utils/utils";

export const randomArr = (): TArraySort[] => {
    let arr: TArraySort[] = [];
    const minLen = 3;
    const maxLen = 17;
    let length = randomNumber(minLen, maxLen);

    for (let i = 0; i < length; i++) {
        arr.push({ state: randomNumber(0, 100), color: ElementStates.Default });
    }
    return arr;
};