import { gql } from "../generated";

export const CREATE_WATCHLIST_ITEM = gql(`
  mutation CreateWatchlistItem($input: CreateWatchlistItemInput!) {
    createWatchlistItem(input: $input) {
      userId
      movieId
      label
      createdAt
      updatedAt
      movie {
        id
        title
        plot
        runtime
        yearReleased
        releasedAt
        certificate
        externalRating
        externalMovieMeterRank
        externalVotes
        posterUrl
        posterHeight
        posterWidth
        landscapePosterUrl
        landscapePosterHeight
        landscapePosterWidth
        showcaseOnHomePage
        createdAt
        updatedAt
        creators {
          id
          name
        }
        genres {
          id
          name
        }
        stars {
          id
          name
        }
      }
    }
  }
`);

export const UPDATE_WATCHLIST_ITEM = gql(`
  mutation UpdateWatchlistItem($movieId: ID!, $input: UpdateWatchlistItemInput!) {
    updateWatchlistItem(movieId: $movieId, input: $input) {
      userId
      movieId
      label
      createdAt
      updatedAt
      movie {
        id
        title
        plot
        runtime
        yearReleased
        releasedAt
        certificate
        externalRating
        externalMovieMeterRank
        externalVotes
        posterUrl
        posterHeight
        posterWidth
        landscapePosterUrl
        landscapePosterHeight
        landscapePosterWidth
        showcaseOnHomePage
        createdAt
        updatedAt
        creators {
          id
          name
        }
        genres {
          id
          name
        }
        stars {
          id
          name
        }
      }
    }
  }
`);

export const DELETE_WATCHLIST_ITEM = gql(`
  mutation DeleteWatchlistItem($movieId: ID!) {
    deleteWatchlistItem(movieId: $movieId)
  }
`);
