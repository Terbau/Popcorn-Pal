describe("HomePage Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render all main components", () => {
    cy.get('[data-cy="slideshow"]').should("exist").and("be.visible");
    cy.get('[data-cy="movie-carousel"]').should("exist").and("be.visible");
    cy.get('[data-cy="movie-carousel-label"]')
      .contains("Top Movies")
      .should("be.visible");
    cy.get('[data-cy="information-view"]').should("have.length", 3);
    cy.get('[data-cy="information-view-title"]')
      .eq(0)
      .should("contain", "Discover movies");
    cy.get('[data-cy="information-view-title"]')
      .eq(1)
      .should("contain", "View a personalized feed");
    cy.get('[data-cy="information-view-title"]')
      .eq(2)
      .should("contain", "Track your watchlist");
  });

  it("should handle loading states", () => {
    cy.get('[data-cy="movie-carousel"]').within(() => {
      cy.get('[data-cy="loading-indicator"]').should("exist");
    });
  });

  it("should display movies in the carousel after loading", () => {
    cy.wait(2000);

    cy.get('[data-cy="movie-carousel"]').within(() => {
      cy.get('[data-cy="movie-carousel-item"]').should(
        "have.length.greaterThan",
        0,
      );
    });
  });
});
