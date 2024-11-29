import type { Meta, StoryObj } from "@storybook/react";
import { DetailedMovieCard } from "./DetailedMovieCard";

const meta: Meta<typeof DetailedMovieCard> = {
  title: "Components/DetailedMovieCard",
  component: DetailedMovieCard,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DetailedMovieCard>;

export default meta;
type Story = StoryObj<typeof DetailedMovieCard>;

const MOVIE_DATA = {
  id: "tt0468569",
  title: "The Dark Knight",
  plot: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
  runtime: 9120,
  yearReleased: 2008,
  posterUrl:
    "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
  posterHeight: 2048,
  posterWidth: 1383,
  landscapePosterUrl:
    "https://m.media-amazon.com/images/M/MV5BYWQ1NGYyYTQtNDAxZi00MDhjLTg0MWYtYTAyOTVkZTMyZjkzXkEyXkFqcGc@._V1_.jpg",
  landscapePosterHeight: 1080,
  landscapePosterWidth: 1920,
  externalRating: 9,
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
};

export const Default: Story = {
  args: {
    movie: MOVIE_DATA,
  },
};

export const FallbackOnly: Story = {
  args: {},
};
