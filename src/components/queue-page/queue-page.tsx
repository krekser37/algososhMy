import React, { ChangeEvent, useRef, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import styles from "./queue.module.css";

const queue_length = 7;
export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const queue = useRef<Queue<string>>(new Queue(queue_length));
  const [arr, setArr] = useState<(string | null)[]>(
    new Array(queue_length).fill(null)
  );
  const [disabled, setDisables] = useState(false);
  const [actionElementIndex, setActionElementIndex] = useState(-1);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    setDisables(true);
  };

  const onClickEnqueue = async () => {
    setLoader({ ...loader, add: true });
    setActionElementIndex(queue.current.getTail);
    queue.current.enqueue(inputValue);
    setArr(queue.current.toArray());
    await delay(SHORT_DELAY_IN_MS);
    setInputValue("");
    setActionElementIndex(-1);
    setLoader({ ...loader, add: false });
    setDisables(false);
  };

  const onClickDequeue = async () => {
    setLoader({ ...loader, delete: true });
    setDisables(true);
    setActionElementIndex(queue.current.getHead);
    await delay(SHORT_DELAY_IN_MS);
    queue.current.dequeue();
    setActionElementIndex(-1);
    setLoader({ ...loader, delete: false });
    setDisables(false);
  };

  const onClickClear = async () => {
    setLoader({ ...loader, clear: true });
    setDisables(true);
    await delay(SHORT_DELAY_IN_MS);
    queue.current.clear();
    setArr(new Array(queue_length).fill(null));
    setDisables(false);
    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <section className={styles.section}>
        <Input
          maxLength={4}
          value={inputValue}
          onChange={onChangeValue}
          type="text"
          isLimitText={true}
          extraClass={styles.input}
          data-cy="input"
        />
        <Button
          text="Добавить"
          linkedList={"small"}
          onClick={() => {
            onClickEnqueue();
          }}
          isLoader={loader.add}
          disabled={!inputValue || queue.current.isFull()}
          extraClass={styles.button}
          data-cy="submitadd"
        />
        <Button
          text="Удалить"
          linkedList={"small"}
          onClick={() => {
            onClickDequeue();
          }}
          isLoader={loader.delete}
          disabled={disabled || queue.current.isEmpty()}
          extraClass={styles.button}
          data-cy="submitdelete"
        />
        <Button
          text="Очистить"
          linkedList={"small"}
          onClick={() => {
            onClickClear();
          }}
          type="reset"
          isLoader={loader.clear}
          disabled={disabled || queue.current.getTail() ===0}
          extraClass={styles.button}
          data-cy="submitclear"
        />
      </section>
      <ul className={styles.list}>
        {arr &&
          arr?.map((item, index) => {
            return (
              <li className="" key={index}>
                <Circle
                  letter={item ? item : ""}
                  state={
                    index === actionElementIndex
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                  head={
                    (index === queue.current.getHead() &&
                    !queue.current.isEmpty()) || (index === queue.current.getHead() && queue.current.getHead() === queue.current.getSize()-1)
                      ? "head"
                      : ""
                  }
                  tail={
                    index === queue.current.getTail() &&
                    !queue.current.isEmpty()
                      ? "tail"
                      : ""
                  }
                  index={index}
                />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
