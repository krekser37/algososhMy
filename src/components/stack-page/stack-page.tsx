import React, { ChangeEvent, useRef, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./stack.module.css";
import { Stack } from "./stack";

/* type TArrayStack = {
  value: string;
  color: ElementStates;
}; */

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
    setArr(stack.current.item);
    setInputValue("");
    setActionElementIndex(stack.current.size - 1);
    await delay(SHORT_DELAY_IN_MS);
    setActionElementIndex(-1);
    setLoader({ ...loader, add: false });
    setDisables(false);
  };

  const onClickPop = async () => {
  // setLoader({ ...loader, delete: true }); 
   // setDisables(true);
   console.log([...stack.current.item]);
   
    setActionElementIndex(stack.current.size);
    setArr([...stack.current.item])
    console.log(stack.current.size);
    
    await delay(SHORT_DELAY_IN_MS);
    stack.current.pop();   
  
    setArr([...stack.current.item])
    console.log([...stack.current.item]);
    setActionElementIndex(-1);
   // setLoader({ ...loader, delete: false });
    //setDisables(false);
  };

  /*   const onClickPush = async () => {
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
  }; */

  /*   const onClickClear = async () => {
    setLoader({ ...loader, clear: true });
    setDisables(true);
    await delay(SHORT_DELAY_IN_MS);
    stack.clear();
    setArr([]);
    setDisables(false);
    setLoader({ ...loader, clear: false });
  }; */

  /*  const onClickPop = async () => {
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
  }; */

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
          disabled={disabled || arr.length === 0}
          extraClass={styles.button}
        />
        <Button
          text="Очистить"
          linkedList={"small"}
          /* onClick={() => {
            onClickClear();
          }} */
          type="reset"
          isLoader={loader.clear}
          disabled={disabled || arr.length === 0}
          extraClass={styles.button}
        />
      </section>
      <ul className="list">
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
