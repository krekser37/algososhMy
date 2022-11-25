import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Step } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./list.module.css";
import { OperationTypes } from "./types";
import { LinkedList } from "./linked-list";
import { addHead, getLetterElementHead, getLetterState } from "./utils";

/* type TNewItem = {
  value?: string;
  color?: ElementStates;
  location?: "top" | "bottom";
  isSmall?: boolean;
}; */

/* type TArrList = {
  value: string;
  color: ElementStates;
  location?: "top" | "bottom";
  isSmall?: boolean;
  newItem?: TNewItem | null;
}; */

/* const randomArr = Array.from({ length: randomNumber(3, 6) }, () =>
  String(randomNumber(0, 99))
); */
const randomArr = ["0", "34", "8", "1"];
console.log(randomArr);

/* const arrList: TArrList[] = randomArr.map((item) => ({
  value: item,
  color: ElementStates.Default,
})); */

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState<string>("");
  const list = useRef(new LinkedList(randomArr));
  const intervalId = useRef<NodeJS.Timeout>();
  const [steps, setSteps] = useState<Step<string>[]>([
    { list: list.current.toArray() },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentOperation, setCurrentOperation] =
    useState<OperationTypes | null>(null);
  const [isActive, setIsActive] = useState(false);
  /*   const [loader, setLoader] = useState({
    loaderAddHead: false,
    loaderAddTail: false,
    loaderDeleteHead: false,
    loaderDeleteTail: false,
    loaderAddIndex: false,
    loaderDeleteIndex: false,
  });
  const [disabled, setDisabled] = useState(false); */

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.currentTarget.value);
  };

  useEffect(() => {
    if (!currentOperation) return;
    setIsActive(true);
    let steps: Step<string>[] = [];
    console.log(steps);

    if (currentOperation === OperationTypes.AddHead) {
      steps = addHead<string>(inputValue, list.current);
      console.log(steps);
    }
    if (steps.length > 1) {
      setSteps(steps);
      setCurrentStep(0);
      intervalId.current = setInterval(() => {
        console.log(currentStep, steps.length);

        setCurrentStep((currentStep) => {
          if (currentStep === steps.length - 1 && intervalId.current) {
            clearInterval(intervalId.current);
            setCurrentOperation(null);
            setIsActive(false);
            setSteps([steps[steps.length - 1]]);
            setInputValue("");
            return 0;
          }

          return currentStep + 1;
        });
      }, SHORT_DELAY_IN_MS);
    }
  }, [currentOperation, inputValue]);

  /*   const onClickAddTail = async () => {
    setLoader({ ...loader, loaderAddTail: true })
    setDisabled(true);
    list.current.append(inputValue);
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
  }; */

  /*   const onClickAddHead = async () => {
    setLoader({ ...loader, loaderAddHead: true })
    list.current.prepend(inputValue);
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
    list.current.deleteTail();
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
  }; */

  /*   const onClickDeleteHead = async () => {
    setDisabled(true);
    setLoader({ ...loader, loaderDeleteHead: true })
    list.current.deleteHead();
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
  }; */

  /*   const onClickDeleteTail = async () => {
    setDisabled(true);
    setLoader({ ...loader, loaderDeleteTail: true })
    list.current.deleteTail();
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
  }; */

  /*   const onClickAddIndex = async () => {
    setLoader({ ...loader, loaderAddIndex: true })
    if (inputIndex) {
      let index = Number(inputIndex);
      list.current.addByIndex(inputValue, index);
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
  }; */

  /*  const onClickDeleteIndex = async () => {
    setLoader({ ...loader, loaderDeleteIndex: true })
    let index = Number(inputIndex);
    list.current.deleteByIndex(index);
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
  }; */

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
          disabled={isActive}
        />
        <Button
          text="Добавить в head"
          linkedList="big"
          onClick={() => {
            setCurrentOperation(OperationTypes.AddHead);
          }}
          isLoader={isActive}
          disabled={!inputValue || (currentOperation !== null && isActive)}
        />
        <Button
          text="Добавить в tail"
          linkedList="big"
          /* onClick={() => {
            onClickAddTail();
          }} */
          /*  isLoader={loader.loaderAddTail} */
          disabled={!inputValue}
        />
        <Button
          text="Удалить из head"
          linkedList="big"
          /* onClick={() => {
            onClickDeleteHead();
          }} */
          /* isLoader={loader.loaderDeleteHead} */
          /* disabled={arr.length === 0} */
        />
        <Button
          text="Удалить из tail"
          linkedList="big"
          /* onClick={() => {
            onClickDeleteTail();
          }} */
          /* isLoader={loader.loaderDeleteTail} */
          /* disabled={arr.length === 0} */
        />
      </section>
      <section className={styles.section}>
        <Input
          extraClass={styles.input}
          placeholder="Введите индекс"
          onChange={onChangeIndex}
          value={inputIndex}
          /* disabled={disabled} */
        />
        <Button
          text="Добавить по индексу"
          linkedList="big"
          /*  onClick={() => {
            onClickAddIndex();
          }} */
          /*  isLoader={loader.loaderAddIndex} */
          disabled={!inputIndex || !inputValue}
        />
        <Button
          text="Удалить по индексу"
          linkedList="big"
          /* onClick={() => {
            onClickDeleteIndex();
          }} */
          /* isLoader={loader.loaderDeleteIndex} */
          disabled={!inputIndex}
        />
      </section>
      <div className={styles.listItem}>
        {steps[currentStep].list?.map((item, index) => (
          <Fragment key={index}>
            <Circle
              letter={item._value}
              //state={item?.color}
              index={index}
              state={getLetterState(
                index,
                steps[currentStep],
                currentOperation
              )}
              head={getLetterElementHead(
                index,
                steps[currentStep],
                currentOperation
              )}
              /* head={index === 0 && !item.newItem ? "head" : ""} */
              /*  tail={index === arr.length - 1 && !item.newItem ? "tail" : ""}  */
            />
            {steps[currentStep].list?.length - 1 !== index && <ArrowIcon />}
          </Fragment>
        ))}
      </div>
    </SolutionLayout>
  );
};
