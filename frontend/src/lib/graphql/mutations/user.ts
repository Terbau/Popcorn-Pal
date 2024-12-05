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

export const CREATE_FOLLOW = gql(`
  mutation CreateFollow($userId: ID!) {
    createFollow(userId: $userId)
  }
`);

export const DELETE_FOLLOW = gql(`
  mutation DeleteFollow($userId: ID!) {
    deleteFollow(userId: $userId)
  }
`);
