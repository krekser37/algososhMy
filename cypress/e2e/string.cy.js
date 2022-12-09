import { DELAY_IN_MS } from "../../src/constants/delays";

const str = [
  [1, 2, 3, 4, 5, 6],
  [6, 2, 3, 4, 5, 1],
  [6, 5, 3, 4, 2, 1],
  [6, 5, 4, 3, 2, 1],
];

const state = [[
  "4px solid rgb(210, 82, 225)",
  "4px solid rgb(0, 50, 255)",
  "4px solid rgb(0, 50, 255)",
  "4px solid rgb(0, 50, 255)",
  "4px solid rgb(0, 50, 255)",
  "4px solid rgb(210, 82, 225)",
], [
  "4px solid rgb(127, 224, 81)",
  "4px solid rgb(210, 82, 225)",
  "4px solid rgb(0, 50, 255)",
  "4px solid rgb(0, 50, 255)",
  "4px solid rgb(210, 82, 225)",
  "4px solid rgb(127, 224, 81)",
], [
  "4px solid rgb(127, 224, 81)",
  "4px solid rgb(127, 224, 81)",
  "4px solid rgb(210, 82, 225)",
  "4px solid rgb(210, 82, 225)",
  "4px solid rgb(127, 224, 81)",
  "4px solid rgb(127, 224, 81)",
]];

describe("component string", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
    cy.contains("Строка");
    cy.get('[data-cy="input"]').as("input");
    cy.get('[data-cy="submit"]').as("button");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input").type("123456").should("have.value", "123456");
    cy.get("@input").clear();
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it(" строка разворачивается корректно", () => {
    cy.clock();
    cy.get("@input").type("123456").should("have.value", "123456");
    cy.get("@button").should("be.visible").click();
    cy.get('div[class*="circle_circle"]').each(($el, index) => {
      cy.wrap($el).should("have.text", str[0][index]);
      cy.wrap($el).should("have.css", "border", state[0][index]);
    });
    cy.tick(DELAY_IN_MS);
    cy.get('div[class*="circle_circle"]').each(($el, index) => {
      cy.wrap($el).should("have.text", str[1][index]);
      cy.wrap($el).should("have.css", "border", state[1][index]);
    });
    cy.tick(DELAY_IN_MS);
    cy.get('div[class*="circle_circle"]').each(($el, index) => {
      cy.wrap($el).should("have.text", str[2][index]);
      cy.wrap($el).should("have.css", "border", state[2][index]);
    });
    cy.tick(DELAY_IN_MS);
    cy.get('div[class*="circle_circle"]').each(($el, index) => {
      cy.wrap($el).should("have.text", str[3][index]);
      cy.wrap($el).should("have.css", "border", "4px solid rgb(127, 224, 81)");
    });
  });
});
