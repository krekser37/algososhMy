/* Очередь
Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.

Проверьте, правильность добавления элемента в очередь. Необходимо убедиться,
что цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
Не забудьте проверить, что курсоры head и tail отрисовываются корректно.

Проверить правильность удаления элемента из очереди.

Проверьте поведение кнопки «Очистить». Добавьте в очередь несколько элементов,
 по нажатию на кнопку «Очистить» длина очереди должна быть равна 0. */

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  buttonadd,
  buttonclear,
  buttondelete,
  circle,
  defaultState,
  head,
  indexCircle,
  modifiedState,
  tail,
} from "./constants";
const inputValue = ["1", "2", "3"];

/* const addArray = () => {
  cy.clock();
  cy.get("@input").type(inputValue[0]).should("have.value", inputValue[0]);
  cy.get("@buttonadd").should("be.visible").click();
  cy.tick(SHORT_DELAY_IN_MS);
  cy.get("@input").type(inputValue[1]).should("have.value", inputValue[1]);
  cy.get("@buttonadd").should("be.visible").click();
  cy.tick(SHORT_DELAY_IN_MS);
  cy.get("@input").type(inputValue[2]).should("have.value", inputValue[2]);
  cy.get("@buttonadd").should("be.visible").click();
  cy.tick(SHORT_DELAY_IN_MS);
}; */

describe("component queue", () => {
  before(() => {
    cy.visit("http://localhost:3000/queue");
    cy.contains("Очередь");
  });

  beforeEach(() => {
    cy.get('[data-cy="input"]').as("input");
    cy.get("button").as("button");
    cy.get(buttonadd).as("buttonadd");
    cy.get(buttondelete).as("buttondelete");
    cy.get(buttonclear).as("buttonclear");
    cy.get(circle)
      .should("have.length", 7)
      .and("have.css", "border", defaultState)
      .each(($el, index) => {
        cy.wrap($el).within(() => {
          cy.get($el).should("have.value", "");
          cy.get($el).siblings(head).should("not.have.text");
          cy.get($el).siblings(tail).should("not.have.text");
          cy.get($el).siblings(indexCircle).should("have.text", index);
        });
      });
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("правильность добавления элемента в очередь", () => {
    cy.clock();
    cy.get("@input").type(inputValue[0]).should("have.value", inputValue[0]);
    cy.get("@buttonadd").should("be.visible").click();
    cy.get(circle)
      .first()
      .should("have.text", inputValue[0])
      .should("have.css", "border", modifiedState)
      .siblings(indexCircle)
      .should("have.text", "0")
      .siblings(tail)
      .should("have.text", "tail")
      .siblings(head)
      .should("have.text", "head");
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).should("have.css", "border", defaultState);
    cy.get("@input").type(inputValue[1]).should("have.value", inputValue[1]);
    cy.get("@buttonadd").should("be.visible").click();
    cy.get(circle).each(($el, index) => {
      if ([0].includes(index)) {
        cy.wrap($el)
          .should("have.text", inputValue[0])
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("have.text", "head")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([1].includes(index)) {
        cy.wrap($el)
          .should("have.text", inputValue[1])
          .should("have.css", "border", modifiedState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("have.text", "tail")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([2, 7].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).should("have.css", "border", defaultState);
    cy.get("@input").type(inputValue[2]).should("have.value", inputValue[2]);
    cy.get("@buttonadd").should("be.visible").click();
    cy.get(circle).each(($el, index) => {
      if ([0].includes(index)) {
        cy.wrap($el)
          .should("have.text", inputValue[0])
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("have.text", "head")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([2].includes(index)) {
        cy.wrap($el)
          .should("have.text", inputValue[2])
          .should("have.css", "border", modifiedState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("have.text", "tail")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([3, 7].includes(index) && [1].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).should("have.css", "border", defaultState);
  });

  it("правильность удаления элемента из очереди", () => {
    cy.clock();
    cy.get("@buttondelete").click();
    cy.get(circle).each(($el, index) => {
      if ([0].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", modifiedState)
          .siblings(head)
          .should("have.text", "head")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([2].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("have.text", "tail")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([3, 7].includes(index) && [1].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      if ([1].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .and("have.value", "")
          .siblings(head)
          .should("have.text", "head")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([2].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("have.text", "tail")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([3, 7].includes(index) && [0].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      }
    });
    cy.get("@buttondelete").click();
    cy.get(circle).each(($el, index) => {
      if ([1].includes(index)) {
        cy.wrap($el).should("have.css", "border", modifiedState);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      if ([2].includes(index)) {
        cy.wrap($el)
          .should("have.text", inputValue[2])
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("have.text", "head")
          .siblings(tail)
          .should("have.text", "tail")
          .siblings(indexCircle)
          .should("have.text", index);
      } else if ([0, 1].includes(index) && [3, 7].includes(index)) {
        cy.wrap($el)
          .should("have.text", "")
          .should("have.css", "border", defaultState)
          .siblings(head)
          .should("not.have.text")
          .siblings(tail)
          .should("not.have.text")
          .siblings(indexCircle)
          .should("have.text", index);
      }
    });
  });

  it("правильность поведение кнопки «Очистить»", () => {
    cy.get(circle).eq(2).should("have.text", inputValue[2]);
    cy.get(circle).each(($el, index) => {
      if ([2].includes(index)) {
        cy.wrap($el).should("have.text", inputValue[2]);
      }
    });
    cy.clock();
    cy.get("@buttonclear").click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el) => {
      cy.wrap($el).should("have.text", "");
    });
  });

  afterEach(() => {
    cy.get("@input").should("have.value", "");
  });
});
