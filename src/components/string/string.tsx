import React, { ChangeEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import "./string.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, swap, TArray } from "../../utils/utils";

/* export type TArray = {
  value: string;
  color: ElementStates;
}; */

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [reverseInputValue, setReverseInputValue] = useState<Array<TArray>>([]);
  const [loader, setLoader] = useState(false);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClick = () => {
    const array = inputValue
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
    reverse(array);
  };

  const reverse = async (array: TArray[]) => {
    setLoader(true);
    const mid = Math.ceil(array.length / 2);
    for (let i = 0; i < mid; i++) {
      let j = array.length - 1 - i;
      if (array.length === 1) {
        array[i].color = ElementStates.Modified;
      } else if (i < j) {
        array[i].color = ElementStates.Changing;
        array[j].color = ElementStates.Changing;
/*         console.log("array[i]=", array[i], "array[j]=", array[j]); */
        setReverseInputValue([...array]);
        swap(array, i, j);
        await delay(DELAY_IN_MS);
      } 
/*       console.log("array[i]=", array[i], "array[j]=", array[j]); */
      array[i].color = ElementStates.Modified;
      array[j].color = ElementStates.Modified;
      setReverseInputValue([...array]);
    }
    setLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <section className="section">
        <Input maxLength={11} value={inputValue} onChange={onChangeValue} type="text" isLimitText ={true}/>
        <Button
          text="Развернуть"
          linkedList={"small"}
          onClick={onClick}
          isLoader={loader}
          disabled={!inputValue}
        />
{/*         <p className="stringSubtitle">Максимум — 11 символов</p> */}
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
