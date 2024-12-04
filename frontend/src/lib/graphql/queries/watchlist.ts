import { gql } from "../generated";

export const GET_WATCHLIST_ITEMS = gql(`
  query GetWatchlistItems($userId: ID!, $page: Int, $pageSize: Int, $orderBy: String!, $orderDirection: String!, $genres: [String!], $labels: [String!]) {
    getWatchlistItems(userId: $userId, page: $page, pageSize: $pageSize, orderBy: $orderBy, orderDirection: $orderDirection, genres: $genres, labels: $labels) {
      results {
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
      totalResults
      userId
      genres
      labels
      orderBy
      orderDirection
    }
  }
`);

export const GET_WATCHLIST_ITEM = gql(`
  query GetWatchlistItem($userId: ID!, $movieId: ID!) {
    getWatchlistItem(userId: $userId, movieId: $movieId) {
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
