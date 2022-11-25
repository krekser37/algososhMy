import React from "react";
import { HEAD } from "../../constants/element-captions";
import { ElementStates, Step } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ADD_OPERATION_TYPE } from "./constants";
import { LinkedList } from "./linked-list";
import { OperationTypes } from "./types";
/* import { Circle } from "../ui/circle/circle"; */

export function addHead<T>(value: T, list: LinkedList<T>): Step<T>[] {
  const steps: Step<T>[] = [];
  steps.push({
    index: 0,
    value,
    list: list.toArray(),
  });
  list.prepend(value);
  steps.push({
    index: 0,
    list: list.toArray(),
  });
  steps.push({
    list: list.toArray(),
  });

  return steps;
}

export function getLetterState<T>(
  index: number,
  currentStep: Step<T>,
  operationType: OperationTypes | null
): ElementStates {
  if (!operationType || currentStep.index === undefined) {
    return ElementStates.Default;
  }

  if (index < currentStep.index && currentStep.value) {
    return ElementStates.Changing;
  }

  if (!currentStep.value && currentStep.index === index) {
    return ElementStates.Modified;
  }
  return ElementStates.Default;
}

export function getLetterElementHead(
  index: number,
  step: Step<string>,
  coperationType: OperationTypes | null
): string | React.ReactElement {
  if (coperationType && step.value && step.index === index && ADD_OPERATION_TYPE.includes(coperationType)) {
    return (
      <Circle letter= { step.value } state = { ElementStates.Changing } isSmall />
    );
  }

  if (!index) {
    return HEAD;
  }

  return "";
}
