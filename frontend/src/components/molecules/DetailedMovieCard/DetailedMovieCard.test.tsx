import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DetailedMovieCard } from "./DetailedMovieCard";
import { MemoryRouter } from "react-router-dom";

describe("DetailedMovieCard Component", () => {
  const defaultMovie = {
    id: "tt0110912",
    title: "Pulp Fiction",
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    runtime: 9240,
    yearReleased: 1994,
    releasedAt: "1994-10-14T00:00:00.000Z",
    certificate: "R",
    externalRating: 8.9,
    externalMovieMeterRank: 118,
    externalVotes: 2276456,
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_QL75_UX1055_CR0,0,1055,1536_.jpg",
    posterHeight: 1536,
    posterWidth: 1055,
    landscapePosterUrl:
      "https://m.media-amazon.com/images/M/MV5BNTczNDBlNzktY2JhMi00MGEyLWFkYWItNmYxNzdhOTk2N2Q2XkEyXkFqcGc@._V1_.jpg",
    landscapePosterHeight: 849,
    landscapePosterWidth: 1507,
    showcaseOnHomePage: false,
    createdAt: "2024-11-17T12:42:29.579Z",
    updatedAt: "2024-11-17T12:42:29.393Z",
    creators: [
      {
        id: "nm0000233",
        name: "Quentin Tarantino",
      },
    ],
    genres: [
      {
        id: "Crime",
        name: "Crime",
      },
      {
        id: "Drama",
        name: "Drama",
      },
    ],
    stars: [
      {
        id: "nm0000168",
        name: "Samuel L. Jackson",
      },
      {
        id: "nm0000235",
        name: "Uma Thurman",
      },
      {
        id: "nm0000237",
        name: "John Travolta",
      },
      {
        id: "nm0000246",
        name: "Bruce Willis",
      },
    ],
  };

  it("renders the movie title and year", () => {
    render(
      <MemoryRouter>
        <DetailedMovieCard movie={defaultMovie} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Pulp Fiction")).toBeInTheDocument();
    expect(screen.getByText("(1994)")).toBeInTheDocument();
  });

  it("renders the movie plot", () => {
    render(
      <MemoryRouter>
        <DetailedMovieCard movie={defaultMovie} />
      </MemoryRouter>,
    );
    const plotElements = screen.getAllByText(
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    );
    expect(plotElements[0]).toBeInTheDocument();
  });

  it("handles the delete button click when provided", () => {
    const handleDelete = vi.fn();
    render(
      <MemoryRouter>
        <DetailedMovieCard
          movie={defaultMovie}
          hasDeleteButton
          isCurrentUser
          onDeleteClick={handleDelete}
        />
      </MemoryRouter>,
    );
    const deleteButton = screen.getByRole("button", {
      name: /remove pulp fiction from watchlist/i,
    });
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("matches snapshot with default movie data", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <DetailedMovieCard movie={defaultMovie} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM
  });

  it("matches snapshot with different movie data", () => {
    const differentMovie = {
      ...defaultMovie,
      title: "Inception",
      plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      yearReleased: 2010,
      externalRating: 8.8,
      externalVotes: 2100000,
    };
    const { asFragment } = render(
      <MemoryRouter>
        <DetailedMovieCard movie={differentMovie} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot(); // Captures the entire DOM with different movie data
  });
});
