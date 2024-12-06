import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, afterEach, expect } from "vitest";
import { MovieCarousel } from "./MovieCarousel";
import { BrowserRouter as Router } from "react-router-dom";

describe("MovieCarousel Component", () => {
  afterEach(() => {
    cleanup();
  });

  const mockMovies = [
    {
      id: "tt0468569",
      title: "The Dark Knight",
      plot: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
      runtime: 9120,
      yearReleased: 2008,
      releasedAt: "2008-07-18T00:00:00.000Z",
      certificate: "PG-13",
      externalRating: 9,
      externalMovieMeterRank: 82,
      externalVotes: 2949383,
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
      posterHeight: 2048,
      posterWidth: 1383,
      landscapePosterUrl:
        "https://m.media-amazon.com/images/M/MV5BYWQ1NGYyYTQtNDAxZi00MDhjLTg0MWYtYTAyOTVkZTMyZjkzXkEyXkFqcGc@._V1_.jpg",
      landscapePosterHeight: 1080,
      landscapePosterWidth: 1920,
      showcaseOnHomePage: false,
      createdAt: "2024-11-24T21:41:40.145Z",
      updatedAt: "2024-11-26T12:35:02.679Z",
      creators: [
        {
          id: "nm0634240",
          name: "Christopher Nolan",
        },
      ],
      genres: [
        {
          id: "Action",
          name: "Action",
        },
        {
          id: "Crime",
          name: "Crime",
        },
        {
          id: "Drama",
          name: "Drama",
        },
        {
          id: "Thriller",
          name: "Thriller",
        },
      ],
      stars: [
        {
          id: "nm0000288",
          name: "Christian Bale",
        },
        {
          id: "nm0000323",
          name: "Michael Caine",
        },
        {
          id: "nm0001173",
          name: "Aaron Eckhart",
        },
        {
          id: "nm0005132",
          name: "Heath Ledger",
        },
      ],
    },
    {
      id: "tt1344854",
      title: "MHz (Megahertz)",
      plot: "A strung-out radio DJ searches for answers in an alternate universe with the inventor of radio himself, Nikola Tesla. This unlikely pairing heals old wounds and allows Tesla to reclaim his power, going head-to-head with titans of industry and arch rivals Edison, Marconi, and JP Morgan.",
      runtime: 5820,
      yearReleased: 2009,
      releasedAt: null,
      certificate: "",
      externalRating: 9,
      externalMovieMeterRank: 243623,
      externalVotes: 9,
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BM2I5NTdiZTAtMWFlNS00NzU5LWIyNzAtNzY5OWMxZDRiOWY1XkEyXkFqcGc@._V1_QL75_UX1280_CR0,0,1280,720_.jpg",
      posterHeight: 720,
      posterWidth: 1280,
      landscapePosterUrl:
        "https://m.media-amazon.com/images/M/MV5BM2I5NTdiZTAtMWFlNS00NzU5LWIyNzAtNzY5OWMxZDRiOWY1XkEyXkFqcGc@._V1_.jpg",
      landscapePosterHeight: 720,
      landscapePosterWidth: 1280,
      showcaseOnHomePage: false,
      createdAt: "2024-11-08T10:16:00.023Z",
      updatedAt: "2024-11-08T10:16:00.021Z",
      creators: [
        {
          id: "nm3239291",
          name: "Lee Pepper",
        },
      ],
      genres: [
        {
          id: "Fantasy",
          name: "Fantasy",
        },
      ],
      stars: [
        {
          id: "nm0107285",
          name: "Frank Brennan",
        },
        {
          id: "nm0212278",
          name: "David de Vries",
        },
        {
          id: "nm2445109",
          name: "John Ammerman",
        },
        {
          id: "nm3256779",
          name: "Paul Ciliano",
        },
      ],
    },
    {
      id: "tt0050083",
      title: "12 Angry Men",
      plot: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
      runtime: 5760,
      yearReleased: 1957,
      releasedAt: "1957-04-10T00:00:00.000Z",
      certificate: "Approved",
      externalRating: 9,
      externalMovieMeterRank: 241,
      externalVotes: 895151,
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_QL75_UX974_CR0,0,974,1500_.jpg",
      posterHeight: 1500,
      posterWidth: 974,
      landscapePosterUrl:
        "https://m.media-amazon.com/images/M/MV5BZTYxYzg3YTktMDNiZi00MGQxLThjYjMtOTI3MmQzMDU5YWQyXkEyXkFqcGc@._V1_.jpg",
      landscapePosterHeight: 954,
      landscapePosterWidth: 1704,
      showcaseOnHomePage: false,
      createdAt: "2024-11-26T09:47:19.050Z",
      updatedAt: "2024-11-26T12:16:49.827Z",
      creators: [
        {
          id: "nm0001486",
          name: "Sidney Lumet",
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
          id: "nm0000020",
          name: "Henry Fonda",
        },
        {
          id: "nm0000842",
          name: "Martin Balsam",
        },
        {
          id: "nm0002011",
          name: "Lee J. Cobb",
        },
        {
          id: "nm0275835",
          name: "John Fiedler",
        },
      ],
    },
  ];

  it("renders the component with a label", () => {
    const { asFragment } = render(
      <Router>
        <MovieCarousel label="Top Movies" movieList={mockMovies} />
      </Router>,
    );
    expect(screen.getByText("Top Movies")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a list of movies", () => {
    render(
      <Router>
        <MovieCarousel movieList={mockMovies} />
      </Router>,
    );
    mockMovies.forEach((movie) => {
      expect(screen.getByAltText(movie.title)).toBeInTheDocument();
    });
  });

  it("renders loading skeletons when `isLoading` is true", () => {
    render(
      <Router>
        <MovieCarousel isLoading={true} movieList={[]} />
      </Router>,
    );
    expect(screen.getAllByRole("img", { hidden: true }).length).toBe(10);
  });

  it("should have proper ARIA roles and labels", () => {
    render(
      <Router>
        <MovieCarousel label="Top Movies" movieList={mockMovies} />
      </Router>,
    );

    expect(
      screen.getByRole("region", { name: "Top Movies" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Scroll left" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Scroll right" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);

    expect(
      screen.getByLabelText("View details for The Dark Knight"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("View details for MHz (Megahertz)"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("View details for 12 Angry Men"),
    ).toBeInTheDocument();
  });

  it("renders with no movies and no errors", () => {
    const { asFragment } = render(
      <Router>
        <MovieCarousel movieList={[]} />
      </Router>,
    );
    expect(screen.queryAllByRole("link").length).toBe(0);
    expect(asFragment()).toMatchSnapshot();
  });
});
