describe("Sign In Page Tests", () => {
  beforeEach(() => {
    // Besøk riktig URL for innloggingssiden
    cy.visit("/project2#/signin");
  });

  it("renders all required elements", () => {
    // Verifiser at alle elementer eksisterer
    cy.get('[data-cy="sign-in-page"]').should("exist");
    cy.get('[data-cy="page-title"]').should("contain.text", "Sign In");
    cy.get('[data-cy="email-input"]').should("exist");
    cy.get('[data-cy="password-input"]').should("exist");
    cy.get('[data-cy="signup-link"]').should("exist");
    cy.get('[data-cy="sign-in-button"]').should("exist");
  });

  it("displays an error for invalid email format", () => {
    // Skriv inn en ugyldig e-post
    cy.get('[data-cy="email-input"]').type("invalid-email");

    // Skriv inn et gyldig passord
    cy.get('[data-cy="password-input"]').type("validpassword");

    // Klikk på submit
    cy.get('[data-cy="sign-in-button"]').click();

    // Verifiser feilmelding for ugyldig e-post
    cy.contains("Invalid email").should("exist");
  });


});
