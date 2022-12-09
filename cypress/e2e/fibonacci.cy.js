//перейти на страницу Фиб, найти инпут,очистить инпут, проверить, что кнопка заблокирована
//корректная генерация чисел Фиб, создать стап с числами в виде массива, в инпут ввести данные, нажать на кнопку, пройтись по циклу, получать элементы и сравнивать их значения

import { circle } from "./constants";

const fibNumbers = [
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
  4181, 6765,
];

describe("component fibonacci", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.contains("Последовательность Фибоначчи");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="submit"]').as("button");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input").type("19").should("have.value", "19");
    cy.get("@input").clear();
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("числа генерируются корректно", () => {
    cy.get("@input").type("19").should("have.value", "19");
    cy.get("@button").should("be.visible").click();
    cy.get("li", { timeout: 12000 }).should("have.length", "19");
    cy.get("li").each((el, index) => {
      cy.wrap(el)
        .find(circle)
        .should("have.text", fibNumbers[index]);
    });
  });

  afterEach(() => {
    cy.get("@input").should("have.value", "");
  });
});
