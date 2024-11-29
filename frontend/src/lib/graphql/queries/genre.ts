import { gql } from "../generated";

export const GET_GENRES = gql(`
  query GetGenres {
    getGenres {
      id
      name
    }
  }
`);
