import React, { ChangeEvent, useRef, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";

import styles from "./stack.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arr, setArr] = useState<string[]>([]);
  const stack = useRef<Stack<string>>(new Stack());
  const [disabled, setDisables] = useState(false);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });
  const [actionElementIndex, setActionElementIndex] = useState(-1);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickPush = async () => {
    setLoader({ ...loader, add: true });
    setDisables(true);
    stack.current.push(inputValue);
    setArr(stack.current.toArray);
    setInputValue("");
    setActionElementIndex(stack.current.size - 1);
    await delay(SHORT_DELAY_IN_MS);
    setActionElementIndex(-1);
    setLoader({ ...loader, add: false });
    setDisables(false);
  };

  const onClickClear = async () => {
    setLoader({ ...loader, clear: true });
    setDisables(true);
    await delay(SHORT_DELAY_IN_MS);
    stack.current.clear();
    setArr([]);
    setDisables(false);
    setLoader({ ...loader, clear: false });
  };

  const onClickPop = async () => {
    setLoader({ ...loader, delete: true });
    setDisables(true);
    setActionElementIndex(stack.current.size-1);
    await delay(SHORT_DELAY_IN_MS);
    stack.current.pop();
    setArr(stack.current.toArray);
    setActionElementIndex(-1);
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
          data-cy="input"
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
          data-cy="submitadd"
        />
        <Button
          text="Удалить"
          linkedList={"small"}
          onClick={() => {
            onClickPop();
          }}
          isLoader={loader.delete}
          disabled={disabled || arr.length === 0}
          extraClass={styles.button}
          data-cy="submitdelete"
        />
        <Button
          text="Очистить"
          linkedList={"small"}
          onClick={() => {
            onClickClear();
          }}
          type="reset"
          isLoader={loader.clear}
          disabled={disabled || arr.length === 0}
          extraClass={styles.button}
          data-cy="submitclear"
        />
      </section>
      <ul className={styles.list}>
        {arr &&
          arr?.map((item, index) => {
            return (
              <li className="" key={index}>
                <Circle
                  letter={item}
                  state={
                    index === actionElementIndex
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                  head={index === arr?.length - 1 ? "top" : undefined}
                  index={index}
                />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
