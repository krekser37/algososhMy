import React, { ChangeEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import "./string.css";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, swap } from "../../utils/utils";
import { getState } from "./utils";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [reverseInputValue, setReverseInputValue] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClick = () => {
    setCurrentIndex(0);
    setLoader(true);
    reverseString(inputValue);
    setInputValue("");
  };

 const reverseString = async (string: string) => {
    const mid = Math.ceil(string.length / 2);
    const array = inputValue.split("");
    for (let i = 0; i < mid; i++) {
      let j = string.length - 1 - i;
      if (string.length === 1) {
        setReverseInputValue([...array]);
      } else if (i < j) {
        setReverseInputValue([...array]);
        await delay(DELAY_IN_MS);
        setCurrentIndex(i + 1);
        swap(array, i, j);
        setReverseInputValue([...array]);
      }
      setReverseInputValue([...array]);
    }
    setLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <section className="section">
        <Input
          maxLength={11}
          value={inputValue}
          onChange={onChangeValue}
          type="text"
          isLimitText={true}
          data-cy="input"
        />
        <Button
          text="Развернуть"
          linkedList={"small"}
          onClick={onClick}
          isLoader={loader}
          disabled={!inputValue}
          data-cy="submit"
        />
      </section>
      <ul className="list">
        {reverseInputValue &&
          reverseInputValue?.map((item, index) => {
            return (
              <li className="" key={index}>
                <Circle
                  letter={item}
                  state={getState(
                    index,
                    currentIndex,
                    reverseInputValue.length
                  )}
                />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
