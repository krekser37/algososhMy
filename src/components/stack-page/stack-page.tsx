import React, { ChangeEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./stack.module.css";

type TArrayStack = {
  value: string;
  color: ElementStates;
};

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getSize: () => number;
  getElements: () => T[];
}

class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.getSize() !== 0) {
      return this.container[this.getSize() - 1];
    } else {
      return null;
    }
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;

  getElements = () => {
    return this.container;
  };
}

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arr, setArr] = useState<TArrayStack[]>([]);
  const [stack] = useState(new Stack<TArrayStack>());
  const [disabled, setDisables] = useState(true);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setDisables(true);
  };

  const onClickPush = async () => {
    stack.push({ value: inputValue, color: ElementStates.Changing });
    setInputValue("");
    setArr([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    console.log(stack.peak());

    const stackPeak = stack.peak();
    if (stackPeak) stackPeak.color = ElementStates.Default;
    console.log(arr);
    setDisables(false);
    setArr([...stack.getElements()]);
  };

  const onClickClear = () => {
    stack.clear();
    setArr([]);
  };

  const onClickPop = async () => {
    const stackPeak = stack.peak();
    if (stackPeak) stackPeak.color = ElementStates.Changing;
    setArr([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArr([...stack.getElements()]);
  };

  return (
    <SolutionLayout title="Стек">
      <section className={styles.section}>
        <Input
          maxLength={4}
          value={inputValue}
          onChange={onChangeValue}
          type="text"
          isLimitText={true}
          extraClass={styles.input}
        />
        <Button
          text="Добавить"
          linkedList={"small"}
          onClick={() => {
            onClickPush();
          }}
          /*  isLoader={loader} */
          disabled={!inputValue}
          extraClass={styles.button}
        />
        <Button
          text="Удалить"
          linkedList={"small"}
          onClick={() => {
            onClickPop();
          }}
          /*  isLoader={loader} */
          disabled={disabled || !arr.length}
          extraClass={styles.button}
        />
        <Button
          text="Очистить"
          linkedList={"small"}
          onClick={() => {
            onClickClear();
          }}
          type="reset"
          /*    isLoader={loader} */
          disabled={disabled || !arr.length}
          extraClass={styles.button}
        />
      </section>
      <ul className="list">
        {arr &&
          arr?.map((item, index) => {
            return (
              <li className="" key={index}>
                <Circle
                  letter={item.value}
                  state={item.color}
                  head={stack.getSize() - 1 === index ? "top" : ""}
                  index={index}
                />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
