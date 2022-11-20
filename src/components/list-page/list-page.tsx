import React, { ChangeEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./list.module.css";
import { LinkedList } from "./utils";

type TNewItem = {
  value?: string;
  color?: ElementStates;
  location?: "top" | "bottom";
  isSmall?: boolean;
};

type TArrList = {
  value: string;
  color: ElementStates;
  location?: "top" | "bottom";
  isSmall?: boolean;
  newItem?: TNewItem | null;
};

const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomArr = Array.from({ length: randomNumber(3, 6) }, () =>
  String(randomNumber(0, 99))
);

const arrList: TArrList[] = randomArr.map((item) => ({
  value: item,
  color: ElementStates.Default,
}));

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [arr, setArr] = useState<TArrList[]>(arrList);
  const list = new LinkedList(randomArr);
  console.log(arr);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  };

  const onClickAddTail = async () => {
    list.append(inputValue);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      newItem: {
        value: inputValue,
        color: ElementStates.Changing,
        location: "top",
        isSmall: true,
      },
    };
    setArr([...arr]);
    console.log([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      newItem: null,
    };
    arr.push({
      value: inputValue,
      color: ElementStates.Modified,
    });
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[arr.length - 1].color = ElementStates.Default;
    setArr([...arr]);
    setInputValue("");
  };

  const onClickAddHead = async () => {
    list.prepend(inputValue);
    arr[0] = {
      ...arr[0],
      newItem: {
        value: inputValue,
        color: ElementStates.Changing,
        location: "top",
        isSmall: true,
      },
    };
    setArr([...arr]);
    console.log([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[0] = {
      ...arr[0],
      newItem: null,
    };
    arr.unshift({
      value: inputValue,
      color: ElementStates.Modified,
    });
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[0].color = ElementStates.Default;
    setArr([...arr]);
    setInputValue("");
  };

  const onClickDeleteHead = async () => {
    list.deleteHead();
    arr[0] = {
      ...arr[0],
      value: "",
      newItem: {
        value: arr[0].value,
        color: ElementStates.Changing,
        location: "bottom",
        isSmall: true,
      },
    };
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr.shift();
    setArr([...arr]);
  };

  const onClickDeleteTail = async () => {

    
  };

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.section}>
        <Input
          placeholder="Введите текст"
          maxLength={4}
          type="text"
          isLimitText={true}
          extraClass={styles.input}
          onChange={onChangeValue}
          value={inputValue}
        />
        <Button
          text="Добавить в head"
          linkedList="big"
          onClick={() => {
            onClickAddHead();
          }}
        />
        <Button
          text="Добавить в tail"
          linkedList="big"
          onClick={() => {
            onClickAddTail();
          }}
        />
        <Button
          text="Удалить из head"
          linkedList="big"
          onClick={() => {
            onClickDeleteHead();
          }}
        />
        <Button
          text="Удалить из tail"
          linkedList="big"
          onClick={() => {
            onClickDeleteTail();
          }}
        />
      </section>
      <section className={styles.section}>
        <Input
          extraClass={styles.input}
          placeholder="Введите индекс"
          onChange={onChangeIndex}
          value={inputIndex}
        />
        <Button text="Добавить по индексу" linkedList="big" />
        <Button text="Удалить по индексу" linkedList="big" />
      </section>
      <ul className="list">
        {arr &&
          arr?.map((item, index) => {
            return (
              <li key={index} className={styles.listItem}>
                {item.newItem && (
                  <Circle
                    letter={item.newItem.value}
                    state={item.newItem.color}
                    isSmall={item.newItem.isSmall}
                    extraClass={`${styles[`${item.newItem.location}`]}`}
                  />
                )}

                <Circle
                  letter={item?.value}
                  state={item?.color}
                  index={index}
                  head={
                    /* showHead(index) */ index === 0 && !item ? "head" : ""
                  }
                  tail={
                    /* showTail(index) */ index === arr.length - 1 ? "tail" : ""
                  }
                  /* extraClass={`${styles[`${item.location}`]}`} */
                />
                {index !== arr?.length - 1 && <ArrowIcon />}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
