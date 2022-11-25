import { LinkedListNode } from "../components/list-page/linked-list";

export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export interface Step<T> {
  list: LinkedListNode<T>[];
  index?: number;
  value?: T;
}