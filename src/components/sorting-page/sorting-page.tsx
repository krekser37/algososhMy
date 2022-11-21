import React, { ChangeEvent, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { delay, swap, TArraySort } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [arr, setArr] = useState<TArraySort[]>([]);
  const [radioInput, setRadioInput] = useState("choice");
  const [sorting, setSorting] = useState<Direction>();

  const onClick = () => {
    setLoader(true);
    setArr(randomArr());
  };

  const randomArr = (): TArraySort[] => {
    let arr: TArraySort[] = [];
    const minLen = 3;
    const maxLen = 17;
    let length = randomNumber(minLen, maxLen);

    for (let i = 0; i < length; i++) {
      arr.push({ state: randomNumber(0, 100), color: ElementStates.Default });
    }
    setLoader(false);
    return arr;
  };

  const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioInput(e.target.value);
  };

  const sortingOnClick = (sorting: Direction) => {
    setSorting(sorting);
    if (radioInput === "choice") {
      choiceSort(arr, sorting);
    } else {
      bubbleSort(arr, sorting);
    }
  };

  const choiceSort = async (arr: TArraySort[], sorting: Direction) => {
    setLoader(true);

    for (let i = 0; i < arr.length; i++) {
      let index = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(DELAY_IN_MS);
        if (sorting === Direction.Ascending) {
          if (arr[j].state < arr[index].state) {
            index = j;
            swap(arr, j, index);
            setArr([...arr]);
          }
        }
        if (sorting === Direction.Descending) {
          if (arr[j].state > arr[index].state) {
            index = j;
            swap(arr, j, index);
            setArr([...arr]);
          }
        }
        arr[j].color = ElementStates.Default;
        arr[i].color = ElementStates.Default;
        setArr([...arr]);
      }
      arr[index].color = ElementStates.Modified;
      swap(arr, i, index);
      setArr([...arr]);
    }
    setLoader(false);
  };

  const bubbleSort = async (arr: TArraySort[], sorting: Direction) => {
    setLoader(true);

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(DELAY_IN_MS);
        if (sorting === Direction.Ascending) {
          if (arr[j].state > arr[j + 1].state) {
            swap(arr, j, j + 1);
          }
        }
        if (sorting === Direction.Descending) {
          if (arr[j].state < arr[j + 1].state) {
            swap(arr, j, j + 1);
          }
        }
        arr[j].color = ElementStates.Default;
        arr[j + 1].color = ElementStates.Default;
        setArr([...arr]);
      }
      const length = arr.length;
      arr[length - i - 1].color = ElementStates.Modified;
      setArr([...arr]);
    }
    setArr([...arr]);
    setLoader(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <fieldset className={styles.radioContainer}>
          <RadioInput
            label="Выбор"
            name="radioButton"
            value="choice"
            checked={radioInput === "choice"}
            onChange={OnChange}
          />
          <RadioInput
            label="Пузырёк"
            name="radioButton"
            value="bubble"
            checked={radioInput === "bubble"}
            onChange={OnChange}
          />
        </fieldset>
        <fieldset className={`${styles.sortContainer}`}>
          <Button
            sorting={Direction.Ascending}
            text="По возрастанию"
            isLoader={loader && sorting === Direction.Ascending}
            onClick={() => {
              sortingOnClick(Direction.Ascending);
            }}
            disabled={loader}
          />
          <Button
            sorting={Direction.Descending}
            text="По убыванию"
            isLoader={loader && sorting === Direction.Descending}
            onClick={() => {
              sortingOnClick(Direction.Descending);
            }}
            disabled={loader}
          />
        </fieldset>
        <Button text="Новый массив" onClick={onClick} disabled={loader} />
      </div>
      <ul className={styles.content}>
        {arr &&
          arr?.map((item, index) => {
            return (
              <li className="" key={index}>
                <Column index={item.state} state={item.color} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
