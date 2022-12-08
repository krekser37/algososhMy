/* Стек
Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
Проверьте правильность добавления элемента в стек. Важно убедиться, 
что цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
Проверить правильность удаления элемента из стека.
Проверьте поведение кнопки «Очистить». Добавьте в стек несколько элементов, 
по нажатию на кнопку «Очистить» длина стека должна быть равна 0. */

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

let inputValue = ["1234", "5", "977"];

const modifiedState = "4px solid rgb(210, 82, 225)";
const defaultState = "4px solid rgb(0, 50, 255)";

describe("component stack", () => {
  const addArray = () => {
    cy.get("@input").type(inputValue[0]).should("have.value", inputValue[0]);
    cy.get("@buttonadd").should("be.visible").click();
    cy.get("@input").type(inputValue[1]).should("have.value", inputValue[1]);
    cy.get("@buttonadd").should("be.visible").click();
    cy.get("@input").type(inputValue[2]).should("have.value", inputValue[2]);
    cy.get("@buttonadd").should("be.visible").click();
  };
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
    cy.contains("Стек");
    cy.get('[data-cy="input"]').as("input");
    cy.get("button").as("button");
    cy.get('[data-cy="submitadd"]').as("buttonadd");
    cy.get('[data-cy="submitdelete"]').as("buttondelete");
    cy.get('[data-cy="submitclear"]').as("buttonclear");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("правильность добавления элемента в стек", () => {
    cy.clock();

    cy.get("@input").type(inputValue[0]).should("have.value", inputValue[0]);
    cy.get("@buttonadd").should("be.visible").click();
    cy.get('div[class*="circle_circle"]')
      .last()
      .should("have.css", "border", modifiedState);
    cy.get('div[class*="circle_circle"]').last().contains(inputValue[0]);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('div[class*="circle_circle"]')
      .last()
      .should("have.css", "border", defaultState);
    cy.get("@input").type(inputValue[1]).should("have.value", inputValue[1]);
    cy.get("@buttonadd").should("be.visible").click();
    cy.get('div[class*="circle_circle"]')
      .last()
      .should("have.css", "border", modifiedState);
    cy.get('div[class*="circle_circle"]').last().contains(inputValue[1]);
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should("have.css", "border", defaultState);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      defaultState
    );
    cy.get("@input").type(inputValue[2]).should("have.value", inputValue[2]);
    cy.get("@buttonadd").should("be.visible").click();
    cy.get('div[class*="circle_circle"]')
      .last()
      .should("have.css", "border", modifiedState);
    cy.get('div[class*="circle_circle"]').last().contains(inputValue[2]);
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should("have.css", "border", defaultState);
    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should("have.css", "border", defaultState);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      defaultState
    );
  });
  it("правильность удаления элемента из стека", () => {
    addArray();
    cy.clock();
    cy.get("@buttondelete").click();
    cy.get('div[class*="circle_circle"]')
      .last()
      .should("have.css", "border", modifiedState);
      cy.get('li').should('have.length', 3)
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('li').should('have.length', 2)
    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      defaultState
    );
    //expect('li').to.have.length(2);
  });

  it("правильность поведение кнопки «Очистить»", () => {
    addArray();
    cy.get('li').should('have.length', 3)
    cy.get("@buttonclear").click();
    cy.get('li').should('have.length', 0)
    cy.get('div[class*="circle_circle"]').should('not.exist')
  });
});
