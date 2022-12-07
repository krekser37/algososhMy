import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/utils";

export const getState = (index: number, currentIndex: number, length: number) => {
  if (
    currentIndex > index ||
    currentIndex > length - index - 1 ||
    length === 1 ||
    currentIndex === Math.floor(length / 2)
  ) {
    return ElementStates.Modified;
  }
  if (currentIndex === index || currentIndex === length - index - 1) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};

export const reverseString = (string: string):Array<string[]>=> {
  const mid = Math.ceil(string.length / 2);
  const array = string.split("");
  const steps:Array<string[]>=[[...array]];
  for (let i = 0; i < mid; i++) {
    let j = string.length - 1 - i;
    if (string.length === 1) {
    } else if (i < j) {
      swap(array, i, j);
      steps.push([...array])
    }
  }
  return steps;
};
/* //2 вариант
export const reverseString = (string: string):string[]=> {
  const mid = Math.ceil(string.length / 2);
  const array:string[] = string.split("");
  for (let i = 0; i < mid; i++) {
    let j = array.length - 1 - i;
    if (array.length === 1) {
    } else if (i < j) {
      swap(array, i, j);
    }
  }
  return array;
}; */
/* 
console.log('1234', reverseString('1234'));
console.log('12345', reverseString('12345')); */