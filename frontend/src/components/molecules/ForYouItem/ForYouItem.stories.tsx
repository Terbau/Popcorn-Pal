import type { Meta, StoryObj } from "@storybook/react";
import { ForYouItem, type ForYouItemProps } from "./ForYouItem";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof ForYouItem> = {
  title: "Components/ForYouItem",
  component: ForYouItem,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ForYouItem>;

export default meta;
type Story = StoryObj<typeof ForYouItem>;

const movieSuggestion = {
  type: "MOVIE_SUGGESTION",
  movieId: "1",
  movieTitle: "Inception",
  moviePosterUrl:
    "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
};

const userSuggestion = {
  type: "USER_SUGGESTION",
  userId: "1",
  userFirstName: "John",
  userLastName: "Doe",
  userAvatarUrl: null,
};

const commentSuggestion = {
  type: "COMMENT_SUGGESTION",
  userId: "1",
  userFirstName: "John",
  userLastName: "Doe",
  userAvatarUrl: null,
  commentId: "1",
  commentContent: "Great movie!",
  commentIsReply: false,
  movieId: "1",
  movieTitle: "Inception",
  moviePosterUrl:
    "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
  timestamp: new Date(),
};

const followingStartedFollowingSomeoneElse = {
  type: "FOLLOWING_STARTED_FOLLOWING_SOMEONE_ELSE",
  userId: "1",
  userFirstName: "John",
  userLastName: "Doe",
  userAvatarUrl: null,
  targetUserId: "2",
  targetUserFirstName: "Jane",
  targetUserLastName: "Smith",
  targetUserAvatarUrl: null,
  timestamp: new Date(),
};

const followingAddedMovieToWatchlist = {
  type: "FOLLOWING_ADDED_MOVIE_TO_WATCHLIST",
  userId: "1",
  userFirstName: "John",
  userLastName: "Doe",
  userAvatarUrl: null,
  movieId: "1",
  movieTitle: "Inception",
  moviePosterUrl:
    "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
  watchlistItemLabel: "WATCHING",
  timestamp: new Date(),
};

const followingUpdatedWatchlistItem = {
  type: "FOLLOWING_UPDATED_WATCHLIST_ITEM",
  userId: "1",
  userFirstName: "John",
  userLastName: "Doe",
  userAvatarUrl: null,
  movieId: "1",
  movieTitle: "Inception",
  moviePosterUrl:
    "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
  watchlistItemLabel: "WATCHING",
  timestamp: new Date(),
};

const followingCommentedOnMovie = {
  type: "FOLLOWING_COMMENTED_ON_MOVIE",
  userId: "1",
  userFirstName: "John",
  userLastName: "Doe",
  userAvatarUrl: null,
  commentId: "1",
  commentContent: "Great movie!",
  commentIsReply: false,
  movieId: "1",
  movieTitle: "Inception",
  moviePosterUrl:
    "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX1383_CR0,0,1383,2048_.jpg",
  timestamp: new Date(),
};

const DefaultRender = (args: ForYouItemProps) => {
  return (
    <MemoryRouter>
      <ForYouItem {...args} />
    </MemoryRouter>
  );
};

export const MovieSuggestion: Story = {
  render: DefaultRender,
  args: {
    item: movieSuggestion,
  },
};

export const UserSuggestion: Story = {
  render: DefaultRender,
  args: {
    item: userSuggestion,
  },
};

export const CommentSuggestion: Story = {
  render: DefaultRender,
  args: {
    item: commentSuggestion,
  },
};

export const FollowingStartedFollowingSomeoneElse: Story = {
  render: DefaultRender,
  args: {
    item: followingStartedFollowingSomeoneElse,
  },
};

export const FollowingAddedMovieToWatchlist: Story = {
  render: DefaultRender,
  args: {
    item: followingAddedMovieToWatchlist,
  },
};

export const FollowingUpdatedWatchlistItem: Story = {
  render: DefaultRender,
  args: {
    item: followingUpdatedWatchlistItem,
  },
};

export const FollowingCommentedOnMovie: Story = {
  render: DefaultRender,
  args: {
    item: followingCommentedOnMovie,
  },
};
