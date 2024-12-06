describe("Movie Page", () => {
  const user = {
    email: "cytest@gmail.com",
    password: "cytest123",
  };

  beforeEach(() => {
    cy.visit("/signin");
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.visit("/movie/tt0816692");
  });

  it("displays movie details", () => {
    cy.get("[data-cy=movie-title]")
      .should("be.visible")
      .and("contain", "Interstellar");

    cy.get("p").should(
      "contain",
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    );
  });

  it("adds/removes movie from watchlist", () => {
    cy.get("[data-cy=add-watchlist-button]").should("be.visible");
    cy.get("[data-cy=add-watchlist-button]").click();
    cy.get("[data-cy=label-picker]").contains("Want to watch").click();
  });

  it("visulises interstellar in watchlist", () => {
    cy.visit("/watchlist/24c807b3-c7cf-4b11-af4e-dbc1b3a2685b");
    cy.contains("Interstellar").should("exist");
  });

  it("removes movie from watchlist", () => {
    cy.get("[data-cy=remove-watchlist-button]").should("be.visible");
    cy.get("[data-cy=remove-watchlist-button]").click();
  });

  it("visulises interstellar not in watchlist", () => {
    cy.visit("/watchlist/24c807b3-c7cf-4b11-af4e-dbc1b3a2685b");
    cy.contains("Interstellar").should("not.exist");
  });
  it("handles comments section", () => {
    cy.get("[data-cy=add-watchlist-button]").should("be.visible");
    cy.get("[data-cy=comments-section]").should("be.visible");
    cy.get("[data-cy=add-watchlist-button]").click();

  });
});
