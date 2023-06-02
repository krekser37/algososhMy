import React, { ChangeEvent, useRef, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay, randomNumber } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./list.module.css";
import { LinkedList } from "./utils";

export enum Location {
  top = "top",
  bottom = "bottom",
}

type TElementStates = {
  modifiedIndex: number;
  changingIndex: number;
};

const randomArr = Array.from({ length: randomNumber(3, 6) }, () =>
  String(randomNumber(0, 99))
);

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState<string>("");
  const list = useRef(new LinkedList(randomArr));
  const [arr, setArr] = useState<string[]>(list.current.toArray());
  const [smallCircleIndex, setSmallCircleIndex] = useState(-1);
  const [smallCircleLocation, setSmallCircleLocation] = useState<
    Location | undefined
  >(undefined);
  const [typeElementStates, setTypeElementStates] = useState<TElementStates>({
    modifiedIndex: -1,
    changingIndex: -1,
  });

  const [currentElement, setCurrentElement] = useState("");
  const [loader, setLoader] = useState({
    loaderAddHead: false,
    loaderAddTail: false,
    loaderDeleteHead: false,
    loaderDeleteTail: false,
    loaderAddIndex: false,
    loaderDeleteIndex: false,
  });
  const [disabled, setDisabled] = useState(false);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  };

  const onClickAddHead = async () => {
    setLoader({ ...loader, loaderAddHead: true });
    setCurrentElement(inputValue);
    setSmallCircleLocation(Location.top);
    setSmallCircleIndex(0);
    await delay(SHORT_DELAY_IN_MS);
    setSmallCircleIndex(-1);
    list.current.prepend(inputValue);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: 0 });
    setArr(list.current.toArray());
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: -1 });
    setInputValue("");
    setLoader({ ...loader, loaderAddHead: false });
    setDisabled(false);
  };

  const onClickAddTail = async () => {
    setLoader({ ...loader, loaderAddTail: true });
    setDisabled(true);
    setCurrentElement(inputValue);
    setSmallCircleLocation(Location.top);
    setSmallCircleIndex(list.current.getSize);
    await delay(SHORT_DELAY_IN_MS);
    list.current.append(inputValue);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: arr.length });
    setSmallCircleIndex(-1);
    setArr(list.current.toArray());
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: -1 });
    setInputValue("");
    setLoader({ ...loader, loaderAddTail: false });
    setDisabled(false);
  };

  const onClickDeleteHead = async () => {
    setDisabled(true);
    setLoader({ ...loader, loaderDeleteHead: true });
    setCurrentElement(arr[0]);
    setSmallCircleLocation(Location.bottom);
    setSmallCircleIndex(0);
    arr.splice(0, 1, "");
    await delay(SHORT_DELAY_IN_MS);
    list.current.deleteHead();
    setSmallCircleIndex(-1);
    setArr(list.current.toArray());
    setLoader({ ...loader, loaderDeleteHead: false });
    setDisabled(false);
  };

  const onClickDeleteTail = async () => {
    setDisabled(true);
    setLoader({ ...loader, loaderDeleteTail: true });
    setCurrentElement(arr[arr.length - 1]);
    setSmallCircleLocation(Location.bottom);
    setSmallCircleIndex(arr.length - 1);
    setArr((arr) => [...arr.slice(0, arr.length - 1), ""]);
    await delay(SHORT_DELAY_IN_MS);
    list.current.deleteTail();
    setSmallCircleIndex(-1);
    setArr(list.current.toArray());
    setLoader({ ...loader, loaderDeleteTail: false });
    setDisabled(false);
  };

  const onClickAddIndex = async () => {
    setLoader({ ...loader, loaderAddIndex: true });
    let currentElementIndex = -1;
    let index = Number(inputIndex);
    while (currentElementIndex <= index) {
      setCurrentElement(inputValue);
      setSmallCircleLocation(Location.top);
      setSmallCircleIndex(currentElementIndex - 1);
      setTypeElementStates({
        ...typeElementStates,
        changingIndex: currentElementIndex - 1,
      });
      setCurrentElement(inputValue);
      setSmallCircleLocation(Location.top);
      setSmallCircleIndex(currentElementIndex);
      await delay(SHORT_DELAY_IN_MS);
      currentElementIndex++;
    }
    list.current.addByIndex(inputValue, index);
    setSmallCircleIndex(-1);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: index });
    setArr(list.current.toArray());
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: -1 });
    setArr(list.current.toArray());
    setInputValue("");
    setInputIndex("");
    setLoader({ ...loader, loaderAddIndex: false });
    setDisabled(false);
  };

  const onClickDeleteIndex = async () => {
    setLoader({ ...loader, loaderDeleteIndex: true });
    let index = Number(inputIndex);
    let currentElementIndex = 0;
    while (currentElementIndex <= index) {
      setTypeElementStates({
        ...typeElementStates,
        changingIndex: currentElementIndex,
      });
      await delay(SHORT_DELAY_IN_MS);
      currentElementIndex++;
    }
    setCurrentElement(arr[index]);
    setSmallCircleLocation(Location.bottom);
    setSmallCircleIndex(index);
    setArr((arr) => [...arr.slice(0, index), "", ...arr.slice(index + 1)]);
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, changingIndex: -1 });
    setSmallCircleIndex(-1);
    list.current.deleteByIndex(index);
    setArr(list.current.toArray());
    setInputIndex("");
    setLoader({ ...loader, loaderDeleteIndex: false });
    setDisabled(false);
  };

  const showHead = (index: number) => {
    return smallCircleIndex === index &&
      smallCircleLocation === Location.top ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === 0 ? (
      "head"
    ) : undefined;
  };

  const showTail = (index: number) => {
    return smallCircleIndex === index &&
      smallCircleLocation === Location.bottom ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === arr.length - 1 ? (
      "tail"
    ) : undefined;
  };

  const getLetterState = (
    index: number,
    typeElementStates: TElementStates
  ): ElementStates => {
    if (typeElementStates.modifiedIndex === index) {
      return ElementStates.Modified;
    }
    if (typeElementStates.changingIndex >= index) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
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
          disabled={disabled}
          data-cy="inputValue"
        />
        <Button
          text="Добавить в head"
          linkedList="big"
          onClick={() => {
            onClickAddHead();
          }}
          isLoader={loader.loaderAddHead}
          disabled={!inputValue}
          data-cy="submitAddHead"
        />
        <Button
          text="Добавить в tail"
          linkedList="big"
          onClick={() => {
            onClickAddTail();
          }}
          isLoader={loader.loaderAddTail}
          disabled={!inputValue}
          data-cy="submitAddTail"
        />
        <Button
          text="Удалить из head"
          linkedList="big"
          onClick={() => {
            onClickDeleteHead();
          }}
          isLoader={loader.loaderDeleteHead}
          disabled={arr.length === 0}
          data-cy="submitDeleteHead"
        />
        <Button
          text="Удалить из tail"
          linkedList="big"
          onClick={() => {
            onClickDeleteTail();
          }}
          isLoader={loader.loaderDeleteTail}
          disabled={arr.length === 0}
          data-cy="submitDeleteTail"
        />
      </section>
      <section className={styles.section}>
        <Input
          extraClass={styles.input}
          placeholder="Введите индекс"
          onChange={onChangeIndex}
          value={inputIndex}
          disabled={disabled }
          type="number"
          min="0"
          max={arr.length - 1}
          data-cy="inputIndex"
        />
        <Button
          text="Добавить по индексу"
          linkedList="big"
          onClick={() => {
            onClickAddIndex();
          }}
          isLoader={loader.loaderAddIndex}
          disabled={!inputIndex || !inputValue || Number(inputIndex) > arr.length - 1}
          data-cy="submitAddIndex"
        />
        <Button
          text="Удалить по индексу"
          linkedList="big"
          onClick={() => {
            onClickDeleteIndex();
          }}
          isLoader={loader.loaderDeleteIndex}
          disabled={!inputIndex || Number(inputIndex) > arr.length-1}
          data-cy="submitDeleteIndex"
        />
      </section>
      <ul className={styles.list}>
        {arr &&
          arr?.map((item, index) => {
            return (
              <li key={index} className={styles.listItem}>
                <Circle
                  letter={item}
                  head={showHead(index)}
                  tail={showTail(index)}
                  state={getLetterState(index, typeElementStates)}
                  index={index}
                />
                {index !== arr?.length - 1 && <ArrowIcon />}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
