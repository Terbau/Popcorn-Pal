import { gql } from "../generated";

export const GET_CURRENT_USER = gql(`
  query GetCurrentUser {
    getUser {
      id
      email
      firstName
      lastName
      avatarUrl
      createdAt
      updatedAt
    }
  }
`);

export const GET_USER = gql(`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
      avatarUrl
      createdAt
      updatedAt
    }
  }
`);
