import React, { ChangeEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import "./fibonacci-page.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arr, setArr] = useState<Array<number>>();
  const [loader, setLoader] = useState(false);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const onClick = () => {
    showFib(inputValue);
  };

  const fib = (n: number): number[] => {
    let arr: number[] = [1,1];
    for (let i = 2; i < n + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    /* console.log(arr); */
    return arr;
  };

  const showFib = async (inputValue: string) => {
    setLoader(true);
    await delay(SHORT_DELAY_IN_MS);
    const arr = fib(Number(inputValue));
    for (let i = 0; i <= arr.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
     /*  console.log(arr[i]); */
      setArr(arr.slice(0,i));
    }
    setLoader(false);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className="sectionfib">
        <Input maxLength={19} value={inputValue} onChange={onChangeValue} isLimitText ={true} max={19} type="number"/>
        <Button
          text="Рассчитать"
          linkedList={"small"}
          onClick={onClick}
          isLoader={loader}
          disabled={!inputValue}
        />
      </section>
      <ul className="listfib">
        {arr &&
          arr?.map((item, index) => {
            return (
              <li className="" key={index}>
                <Circle letter={String(item)} index={index} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
