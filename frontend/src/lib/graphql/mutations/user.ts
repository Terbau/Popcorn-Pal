import { gql } from "../generated";

export const UPDATE_USER = gql(`
  mutation UpdateProfile($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
