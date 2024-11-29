import { gql } from "../generated";

export const GET_MOVIES = gql(`
  query GetMovies ($orderBy: String!, $orderDirection: String!, $page: Int!, $pageSize: Int!, $genres: [String!]) {
    getMovies(orderBy: $orderBy, orderDirection: $orderDirection, page: $page, pageSize: $pageSize, genres: $genres) {
      results {
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
      totalResults
      nextPage
    }
  }
`);

export const GET_MOVIE = gql(`
  query GetMovie ($id: ID!) {
    getMovie(id: $id) {
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
`);

export const GET_FEATURED_MOVIES = gql(`
  query GetFeaturedMovies {
    getFeaturedMovies {
      id
      title
      yearReleased
      externalRating
      landscapePosterUrl
      landscapePosterHeight
      landscapePosterWidth
    }
  }
`);

export const SEARCH_MOVIES = gql(`
  query SearchMovies($query: String!, $page: Int!, $pageSize: Int!) {
    searchMovies(query: $query, page: $page, pageSize: $pageSize) {
      results {
        id
        title
        yearReleased
        posterUrl
        posterHeight
        posterWidth
        externalRating
        similarity
      }
      totalResults
      nextPage
    }
  }
`);

export const GET_RANDOM_MOVIE = gql(`
  query randomMovie {
    randomMovie {
      id
    }
  }
`);
