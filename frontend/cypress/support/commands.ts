/// <reference types="cypress" />

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get("button").contains("Login").click();
  cy.wait(1000);
});
