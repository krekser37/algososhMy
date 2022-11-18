import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./list.module.css";

type TArrayList = {
  value: string;
  color: ElementStates;
};
const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomArr = Array.from({ length: randomNumber(3, 6) }, () =>
  String(randomNumber(0, 99))
);

export const ListPage: React.FC = () => {
 const [inputValue, setInputValue]= useState("");
 const [inputIndex, setInputIndex]= useState("");

  const initialArr: TArrayList[] = randomArr.map((item) => ({
    value: item,
    color: ElementStates.Default,
  }));
  const [arr, setArr] = useState(initialArr);

  console.log(arr);

  /*  const list = new LinkedList(randomArr); */

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
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
        <Button text="Добавить в head" linkedList="big" />
        <Button text="Добавить в tail" linkedList="big" />
        <Button text="Удалить из head" linkedList="big" />
        <Button text="Удалить из tail" linkedList="big" />
      </section>
      <section className={styles.section}>
        <Input
          extraClass={styles.input}
          placeholder="Введите индекс"  onChange={onChangeIndex}
          value={inputIndex }
        />
        <Button text="Добавить по индексу" linkedList="big" />
        <Button text="Удалить по индексу" linkedList="big" />
      </section>
      <ul className="list">
        {arr &&
          arr?.map((item, index) => {
            return (
              <li  key={index} className={styles.listItem}>
                <Circle letter={item?.value} state={item?.color} />
                {index !== arr?.length - 1 &&<ArrowIcon />}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
