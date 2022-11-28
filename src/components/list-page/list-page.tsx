import React, { ChangeEvent, useState } from "react";
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

const randomArr = Array.from({ length: randomNumber(3, 6) }, () =>
  String(randomNumber(0, 99))
);

const arrList: TArrList[] = randomArr.map((item) => ({
  value: item,
  color: ElementStates.Default,
}));

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState<string>("");
  const [arr, setArr] = useState<TArrList[]>(arrList);
  const list = new LinkedList(randomArr);
  const [loader,setLoader]=useState({
    loaderAddHead:false,
    loaderAddTail:false,
    loaderDeleteHead:false,
    loaderDeleteTail:false,
    loaderAddIndex:false,
    loaderDeleteIndex:false,
  })
  const [disabled, setDisabled]=useState(false)

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  };

  const onClickAddTail = async () => {
    setLoader({ ...loader, loaderAddTail: true })
    setDisabled(true);
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
    setLoader({ ...loader, loaderAddTail: false })
    setDisabled(false);
  };

  const onClickAddHead = async () => {
    setLoader({ ...loader, loaderAddHead: true })
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

    await delay(SHORT_DELAY_IN_MS);
    arr[0] = {
      ...arr[0],
      newItem: null,
    };
    list.deleteTail();
    arr.unshift({
      value: inputValue,
      color: ElementStates.Modified,
    });
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[0].color = ElementStates.Default;
    setArr([...arr]);
    setInputValue("");
    setLoader({ ...loader, loaderAddHead: false })
    setDisabled(false);
  };

  const onClickDeleteHead = async () => {
    setDisabled(true);
    setLoader({ ...loader, loaderDeleteHead: true })
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
    setLoader({ ...loader, loaderDeleteHead: false })
    setDisabled(false);
  };

  const onClickDeleteTail = async () => {
    setDisabled(true);
    setLoader({ ...loader, loaderDeleteTail: true })
    list.deleteTail();
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      value: "",
      newItem: {
        value: arr[arr.length - 1].value,
        color: ElementStates.Changing,
        location: "bottom",
        isSmall: true,
      },
    };
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr.pop();
    setArr([...arr]);
    setLoader({ ...loader, loaderDeleteTail: false })
    setDisabled(false);
  };

  const onClickAddIndex = async () => {
    setLoader({ ...loader, loaderAddIndex: true })
    if (inputIndex) {
      let index = Number(inputIndex);
      list.addByIndex(inputValue, index);
      for (let i = 0; i <= index; i++) {
        arr[i] = {
          ...arr[i],
          color: ElementStates.Changing,
          newItem: {
            value: inputValue,
            color: ElementStates.Changing,
            location: "top",
            isSmall: true,
          },
        };

        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        arr[i] = {
          ...arr[i],
          newItem: null,
        };
        setArr([...arr]);
      }
      arr.forEach((item) => (item.color = ElementStates.Default));
      arr.splice(index, 0, {
        value: inputValue,
        color: ElementStates.Modified,
        newItem: null,
      });
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      arr.forEach((item) => (item.color = ElementStates.Default));
      setArr([...arr]);
      setInputValue("");
      setInputIndex("");
      setLoader({ ...loader, loaderAddIndex: false })
      setDisabled(false);
    }
  };
  const onClickDeleteIndex = async () => {
    setLoader({ ...loader, loaderDeleteIndex: true })
    let index = Number(inputIndex);
    list.deleteByIndex(index);
    for (let i = 0; i <= index; i++) {
      arr[i] = {
        ...arr[i],
        color: ElementStates.Changing,
      };
      await delay(SHORT_DELAY_IN_MS);
      setArr([...arr]);
    }
    arr[index] = {
      ...arr[index],
      value: "",
      color: ElementStates.Default,
      newItem: {
        value: arr[index].value,
        color: ElementStates.Changing,
        location: "bottom",
        isSmall: true,
      },
    };
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr.splice(index, 1);
    arr.forEach((item) => (item.color = ElementStates.Default));
    setArr([...arr]);
    setInputIndex("");
    setLoader({ ...loader, loaderDeleteIndex: false })
    setDisabled(false);
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
        />
        <Button
          text="Добавить в head"
          linkedList="big"
          onClick={() => {
            onClickAddHead();
          }}
          isLoader={loader.loaderAddHead}
          disabled={!inputValue}
        />
        <Button
          text="Добавить в tail"
          linkedList="big"
          onClick={() => {
            onClickAddTail();
          }}
          isLoader={loader.loaderAddTail}
          disabled={!inputValue}
        />
        <Button
          text="Удалить из head"
          linkedList="big"
          onClick={() => {
            onClickDeleteHead();
          }}
          isLoader={loader.loaderDeleteHead}
          disabled={arr.length === 0}
        />
        <Button
          text="Удалить из tail"
          linkedList="big"
          onClick={() => {
            onClickDeleteTail();
          }}
          isLoader={loader.loaderDeleteTail}
          disabled={arr.length === 0}
        />
      </section>
      <section className={styles.section}>
        <Input
          extraClass={styles.input}
          placeholder="Введите индекс"
          onChange={onChangeIndex}
          value={inputIndex}
          disabled={disabled}
        />
        <Button
          text="Добавить по индексу"
          linkedList="big"
          onClick={() => {
            onClickAddIndex();
          }}
          isLoader={loader.loaderAddIndex}
          disabled={!inputIndex || !inputValue}
        />
        <Button
          text="Удалить по индексу"
          linkedList="big"
          onClick={() => {
            onClickDeleteIndex();
          }}
          isLoader={loader.loaderDeleteIndex}
          disabled={!inputIndex }
        />
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
                  head={index === 0 && !item.newItem ? "head" : ""}
                  tail={index === arr.length - 1 && !item.newItem ? "tail" : ""}
                />
                {index !== arr?.length - 1 && <ArrowIcon />}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
