import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className="section">
        <Input maxLength={19} /* value={inputValue} onChange={onChangeValue} */ />
        <Button
          text="Развернуть"
          linkedList={"small"}
/*           onClick={onClick}
          isLoader={loader}
          disabled={!inputValue} */
        />
        <p className="stringSubtitle">Максимум — 19 символов</p>
      </section>
    </SolutionLayout>
  );
};
