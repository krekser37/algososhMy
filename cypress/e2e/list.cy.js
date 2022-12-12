/* Список
Проверьте, что если в инпуте пусто, то кнопка добавления недоступна, 
кнопки добавления по индексу и удаления по индексу недоступны тоже.
Проверьте корректность:
отрисовки дефолтного списка.
добавления элемента в head.
добавления элемента в tail.
добавления элемента по индексу.
удаления элемента из head.
удаления элемента из tail.
удаления элемента по индексу. */

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  buttonAddHead,
  buttonAddIndex,
  buttonAddTail,
  buttonDeleteHead,
  buttonDeleteIndex,
  buttonDeleteTail,
  circle,
  defaultState,
  changeState,
  modifiedState,
  head,
  indexCircle,
  tail,
  smallCircle,
  modifiedCircle,
  changingCircle,
} from "./constants";

const inputValue = ["1", "1111", "3"];
const indexValue = 2;

describe("component list", () => {
  before(() => {
    cy.visit("http://localhost:3000/list");
    cy.contains("Связный список");
  });

  beforeEach(() => {
    cy.get('[data-cy="inputValue"]').as("inputValue");
    cy.get('[data-cy="inputIndex"]').as("inputIndex");
    cy.get(buttonAddHead).as("buttonAddHead");
    cy.get(buttonAddTail).as("buttonAddTail");
    cy.get(buttonDeleteHead).as("buttonDeleteHead");
    cy.get(buttonDeleteTail).as("buttonDeleteTail");
    cy.get(buttonAddIndex).as("buttonAddIndex");
    cy.get(buttonDeleteIndex).as("buttonDeleteIndex");
    /*       cy.get(circle)
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
*/
  });

  it("если в инпуте текста пусто, то кнопки добавления недоступны, кнопка добавления по индексу и удаления по индексу недоступны", () => {
    cy.get("@inputValue").should("have.value", "");
    cy.get("@buttonAddHead").should("be.disabled");
    cy.get("@buttonAddTail").should("be.disabled");
    cy.get("@buttonAddIndex").should("be.disabled");
    cy.get("@buttonDeleteIndex").should("be.disabled");
  });

  it("если в инпуте индекса пусто, то кнопки добавления недоступны, кнопка добавления по индексу и удаления по индексу недоступны", () => {
    cy.get("@inputIndex").should("have.value", "");
    cy.get("@buttonAddIndex").should("be.disabled");
    cy.get("@buttonDeleteIndex").should("be.disabled");
  });

  it("Проверить корректность отрисовки дефолтного списка", () => {
    cy.get(circle).its("length").should("be.gte", 3).and("be.lte", 6);
    cy.get(circle).first().siblings(head).should("have.text", "head");
    cy.get(circle).last().siblings(tail).should("have.text", "tail");
    cy.get(circle).each(($el, index) => {
      cy.wrap($el)
        .should("have.css", "border", defaultState)
        .and("not.to.be.empty")
        .siblings(indexCircle)
        .should("have.text", index);
    });
  });

  it("Проверить корректность добавления элемента в head", () => {
    cy.clock();
    cy.get("@inputValue")
      .type(inputValue[0])
      .should("have.value", inputValue[0]);
    cy.get("@buttonAddHead").should("be.visible").click();
    cy.get(smallCircle)
      .first()
      .should("have.text", inputValue[0])
      .should("have.css", "border", modifiedState);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle)
      .eq(1)
      .should("have.text", inputValue[0])
      .should("have.css", "border", changeState)
      .siblings(head)
      .should("have.text", "head")
      .siblings(tail)
      .should("not.have.text")
      .siblings(indexCircle)
      .should("have.text", 0);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).eq(1).should("have.css", "border", defaultState);
  });

  it("Проверить корректность добавления элемента в tail", () => {
    cy.clock();
    cy.get("@inputValue")
      .type(inputValue[2])
      .should("have.value", inputValue[2]);
    cy.get("@buttonAddTail").should("be.visible").click();
    cy.get(smallCircle)
      .last()
      .should("have.text", inputValue[2])
      .should("have.css", "border", modifiedState);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(modifiedCircle);
    cy.get(circle)
      .last()
      .should("have.text", inputValue[2])
      .should("have.css", "border", changeState)
      .siblings(head)
      .should("not.have.text")
      .siblings(tail)
      .should("have.text", "tail");
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).should("have.css", "border", defaultState);
  });

  it("Проверить корректность добавления элемента по индексу", () => {
    cy.clock();
    cy.get("@inputValue")
      .type(inputValue[1])
      .should("have.value", inputValue[1]);
    cy.get("@inputIndex").type(indexValue).should("have.value", indexValue);
    cy.get("@buttonAddIndex").should("be.visible").click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(smallCircle)
      .should("have.text", inputValue[1])
      .should("have.css", "border", modifiedState);
    cy.get(circle).eq(0).should("have.css", "border", modifiedState);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      if ([0, 2].includes(index)) {
        cy.wrap($el).should("have.css", "border", modifiedState);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(changingCircle).contains(inputValue[1]);
    cy.get(circle).each(($el, index) => {
      if ([3].includes(index)) {
        cy.wrap($el)
          .should("have.css", "border", changeState)
          .and("have.text", inputValue[1]);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      cy.wrap($el).should("have.css", "border", defaultState);
    });
  });

  it("Проверить удаление элемента по индексу", () => {
    cy.clock();
    cy.get("@inputIndex").type(indexValue).should("have.value", indexValue);
    cy.get("@buttonDeleteIndex").should("be.visible").click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).first().should("have.css", "border", modifiedState);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).each(($el, index) => {
      if ([1, indexValue].includes(index)) {
        cy.wrap($el).should("have.css", "border", modifiedState);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(smallCircle)
      .should("have.text", inputValue[1])
      .should("have.css", "border", modifiedState);
    cy.get(circle).each(($el, index) => {
      if ([indexValue].includes(index)) {
        cy.wrap($el).should("not.have.text");
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(smallCircle).should("not.exist");
    cy.get(circle).each(($el, index) => {
      cy.wrap($el).should("not.to.be.empty");
    });
  });

    it("Проверить удаление элемента из head", () => {
    cy.clock();
    cy.get(circle).each(($el, index) => {
      if ([0].includes(index)) {
        const elValue = $el[0].textContent;
        cy.get("@buttonDeleteHead").should("be.visible").click();
        cy.get(smallCircle)
          .should("have.text", elValue)
          .should("have.css", "border", modifiedState);
        cy.wrap($el).should("not.have.text");
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(smallCircle).should("not.exist");
    cy.get(circle).each(($el, index) => {
      cy.wrap($el).should("not.to.be.empty");
    });
  });

  it("Проверить удаление элемента из tail", () => {
    cy.clock();
    cy.get("@buttonDeleteTail").should("be.visible").click();
    cy.get(circle).last().prev().should("have.text", "");
    cy.get(smallCircle)
      .should("have.text", inputValue[2])
      .should("have.css", "border", modifiedState);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(smallCircle).should("not.exist");
    cy.get(circle).each(($el, index) => {
      cy.wrap($el).should("not.to.be.empty");
    });
  });
});
