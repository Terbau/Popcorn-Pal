describe("Responsive Navbar interactions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("does not show the sidebar toggle button", () => {
      cy.get("[data-cy=menu-button]").should("not.be.visible");
    });

    it("displays navbar links in desktop view", () => {
      cy.get("[data-cy=navbar-links]").should("be.visible");
      cy.get("[data-cy=navbar-link-home]").should("be.visible");
    });

    it('displays suggestions when searching for "twilight"', () => {
      cy.get("[data-cy=search-input]").type("twilight");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });

    it("toggles the sidebar on button click and redirects to home", () => {
      cy.get("[data-cy=menu-button]").click();
      cy.contains("Home");
      cy.contains("Discover");
    });
    it("toggles to light mode", () => {
      cy.get("[data-cy=toggle-dark-mode]").should("be.visible");
      cy.get("[data-cy=toggle-dark-mode]").click();
      cy.get("[data-cy=navbar]").should("have.class", "bg-cream");
      cy.get("[data-cy=toggle-dark-mode]").should("be.visible");
      cy.get("[data-cy=toggle-dark-mode]").click();
    });
  });
});
