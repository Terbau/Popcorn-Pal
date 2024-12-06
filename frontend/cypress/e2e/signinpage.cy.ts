describe("Sign In Page Tests", () => {
  beforeEach(() => {

    cy.visit("/project2#/signin");
  });

  it("renders all required elements", () => {

    cy.get('[data-cy="sign-in-page"]').should("exist");
    cy.get('[data-cy="page-title"]').should("contain.text", "Sign In");
    cy.get('[data-cy="email-input"]').should("exist");
    cy.get('[data-cy="password-input"]').should("exist");
    cy.get('[data-cy="signup-link"]').should("exist");
    cy.get('[data-cy="sign-in-button"]').should("exist");
  });

  it("displays an error for invalid email format", () => {
    cy.get('[data-cy="email-input"]').type("invalid-email");
    cy.get('[data-cy="password-input"]').type("validpassword");
    cy.get('[data-cy="sign-in-button"]').click();
    cy.contains("Invalid email").should("exist");
  });


});
