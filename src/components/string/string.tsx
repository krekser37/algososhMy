import React, { ChangeEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import "./string.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";


type TArray = {
  value: string;
  color: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [reverseInputValue, setReverseInputValue] = useState<Array<TArray>>([]);
  const [loader, setLoader]= useState(false);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClick = () => {
    const array = inputValue
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
    console.log(typeof array);
    reverse(array);
  };

  const reverse = async (array:TArray[]) => {
    setLoader(true);
    const mid = Math.ceil(array.length / 2);
    console.log(array);

    console.log(array.length);
    console.log(mid);
    console.log(array[mid]);
    for (let i=0; i <= mid; i++) {
      let j = array.length -1-i;
/*       console.log(array[array.length-1]); */
      if (i !==mid /* && i!==mid */) {
        array[i].color = ElementStates.Changing;
        array[j].color = ElementStates.Changing;
        setReverseInputValue([...array]);
        await delay(DELAY_IN_MS);
      }
      swap(array, i, j);
      array[i].color = ElementStates.Modified;
      array[j].color = ElementStates.Modified;
      setReverseInputValue([...array]);
    }
    setLoader(false);
  };

  const swap = (arr: TArray[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  return (
    <SolutionLayout title="Строка">
      <section className="section">
        <Input maxLength={11} value={inputValue} onChange={onChangeValue} />
        <Button text="Развернуть" linkedList={"small"} onClick={onClick} isLoader={loader} disabled={!inputValue}/>
        <p className="stringSubtitle">Максимум — 11 символов</p>
      </section>
      <ul className="list">
        {reverseInputValue &&
          reverseInputValue?.map((item, index) => {
            return (
              <li className="" key={index}>
                <Circle letter={item.value} state={item.color} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
