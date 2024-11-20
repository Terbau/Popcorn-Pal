describe("HomePage Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("visits the homepage and verifies essential components are visible", () => {
    cy.contains("Topp 10 filmer").should("be.visible");
    cy.get('[data-cy="top10-movies"]').should("be.visible");
    cy.get('[data-cy="filterable-movie-section"]').should("be.visible");
  });

  it("tests the movie carousel for correct functionality", () => {
    cy.get('[data-cy="top10-movies"]').within(() => {
      cy.get("li").should("have.length.greaterThan", 0);
      cy.get("li").first().should("contain.text", "1");
      cy.get('[data-cy="next-button"]').click();
      cy.get("li").eq(1).should("be.visible");
    });
  });

  describe("FilterBar Component Tests", () => {
    beforeEach(() => {
      cy.visit("/"); // Juster URL basert på testen
    });

    it("renders all filter items", () => {
      ["Adventure", "Action", "Sci-Fi", "Drama", "Thriller"].forEach((filter) => {
        cy.get(`[data-cy="filter-${filter}"]`).should("be.visible").and("contain.text", filter);
      });
    });

    it("selects a filter and updates the active state", () => {
      // Klikk på 'Action'-filteret og bekreft klassen
      cy.get('[data-cy="filter-Action"]').click();
      cy.get('[data-cy="filter-Action"]').should("have.class", "outline");

      // Bekreft at 'Drama'-filteret ikke lenger har klassen
      cy.get('[data-cy="filter-Drama"]').should("not.have.class", "outline");
    });



  });

});
