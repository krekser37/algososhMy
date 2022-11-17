import React, { ChangeEvent, useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./queue.module.css";

type TArrayQueue = {
  value?: string;
  color: ElementStates;
};

const emptyQueue = Array.from({ length: 7 }, () => ({
  value: "",
  color: ElementStates.Default,
}));
interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;
  getTail: () => number;
  getHead: () => number;
  isFull: () => boolean;
  getElements: () => Array<T | null>;
}
class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  getTail = () => {
    return this.tail;
  };

  getHead = () => {
    return this.head;
  };

  getElements = (): (T | null)[] => {
    return [...this.container];
  };

  isEmpty = () => this.length === 0;

  isFull = () => this.length >= this.size;

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  };
}

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arr, setArr] = useState<(TArrayQueue | null)[]>([]);
  const [disabled, setDisables] = useState(true);
  const [queue, setQueue] = useState(new Queue<TArrayQueue>(7));

  useEffect(() => {
    setArr(emptyQueue);
  }, []);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setDisables(true);
  };

  const onClickEnqueue = async () => {
    queue.enqueue({ value: inputValue, color: ElementStates.Changing });
    setQueue(queue);
    setArr([...queue.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    const items = queue.getElements();
    const item = items[queue.getTail() - 1];
    if (item) item.color = ElementStates.Default;
    setInputValue("");
    setDisables(false);
  };
 

  const onClickDequeue = async () => {
    await delay(SHORT_DELAY_IN_MS);
    queue.peak();
    setQueue(queue);
    const item = queue.peak();
    console.log(item);
    
    if (item) item.color = ElementStates.Changing;
    setArr([...queue.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    console.log(queue.getTail());
    console.log(queue.getHead());
    if (item) item.color = ElementStates.Default;
    setArr([...queue.getElements()]);
    setDisables(false);
  };

  const onClickClear = () => {
    setArr(emptyQueue);
    queue.clear();
    setQueue(queue);
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
        />
        <Button
          text="Добавить"
          linkedList={"small"}
          onClick={() => {
            onClickEnqueue();
          }}
          /*  isLoader={loader} */
          disabled={!inputValue || queue.isFull()}
          extraClass={styles.button}
        />
        <Button
          text="Удалить"
          linkedList={"small"}
          onClick={() => {
            onClickDequeue();
          }}
          /*  isLoader={loader} */
          disabled={disabled || !arr.length}
          extraClass={styles.button}
        />
        <Button
          text="Очистить"
          linkedList={"small"}
          onClick={() => {
            onClickClear();
          }}
          type="reset"
          /*    isLoader={loader} */
          disabled={disabled || !arr.length}
          extraClass={styles.button}
        />
      </section>
      <ul className="list">
        {arr &&
          arr?.map((item, index) => {
            return (
              <li className="" key={index}>
                <Circle
                  letter={item?.value}
                  state={item?.color}
                  head={index === queue.getHead() && !queue.isEmpty() ? "head" : ""}
                  tail={index === queue.getTail() - 1 && !queue.isEmpty()? "tail" : "" }
                  index={index}
                />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
