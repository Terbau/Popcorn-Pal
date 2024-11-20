describe("Movie Page Tests", () => {
  beforeEach(() => {
    // Naviger til filmen med faktisk URL
    cy.visit("/project2#/movie/tt0110912");
  });

  it("renders the movie details correctly", () => {
    // Vent til lastetilstanden er ferdig
    cy.get('[data-cy="movie-title"]').should("be.visible");

    // Verifiser filmens overskrift
    cy.get('[data-cy="movie-header"]').should("be.visible");

    // Verifiser filmens tittel
    cy.get('[data-cy="movie-title"]').should("contain.text", "Pulp Fiction");

    // Verifiser rating
    cy.get('[data-cy="movie-rating"]').should("contain.text", "8.9 / 10 Rating");

    // Verifiser filmens plakat
    cy.get('[data-cy="movie-poster"] img').should("have.attr", "src").and("not.be.empty");

    // Verifiser metadata
    cy.get('[data-cy="movie-metadata"]').within(() => {
      cy.get('[data-cy="metadata-Director"]').should("contain.text", "Quentin Tarantino");
      cy.get('[data-cy="metadata-Genres"]').should("contain.text", "Crime, Drama");
    });
  });


});
