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
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickPush = async () => {
    setLoader({ ...loader, add: true });
    setDisables(true);
    stack.push({ value: inputValue, color: ElementStates.Changing });
    setInputValue("");
    setArr([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);

    const stackPeak = stack.peak();
    if (stackPeak) stackPeak.color = ElementStates.Default;
    setDisables(false);
    setArr([...stack.getElements()]);
    setLoader({ ...loader, add: false });
  };

  const onClickClear = async () => {
    setLoader({ ...loader, clear: true });
    setDisables(true);
    await delay(SHORT_DELAY_IN_MS);
    stack.clear();
    setArr([]);
    setDisables(false);
    setLoader({ ...loader, clear: false });
  };

  const onClickPop = async () => {
    setLoader({ ...loader, delete: true });
    setDisables(true);
    const stackPeak = stack.peak();
    if (stackPeak) stackPeak.color = ElementStates.Changing;
    setArr([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArr([...stack.getElements()]);
    setLoader({ ...loader, delete: false });
    setDisables(false);
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
          isLoader={loader.add}
          disabled={!inputValue}
          extraClass={styles.button}
        />
        <Button
          text="Удалить"
          linkedList={"small"}
          onClick={() => {
            onClickPop();
          }}
          isLoader={loader.delete}
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
          isLoader={loader.clear}
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
