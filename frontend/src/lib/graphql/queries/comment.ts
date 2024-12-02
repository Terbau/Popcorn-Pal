import { gql } from "../generated";

export const GET_RECURSIVE_COMMENTS = gql(`
  query GetRecursiveComments(
    $movieId: ID!
    $parentId: ID
    $limitAtDepth: Int
    $maxDepth: Int
    $page: Int
    $pageSize: Int
    $orderDirection: String
  ) {
    getComment(id: $parentId) {
      id
      userId
      movieId
      content
      createdAt
      updatedAt
      deletedAt
      parentId
      depth
      totalComments
      user {
        id
        email
        avatarUrl
        firstName
        lastName
      }
      voteRatio
      hasUpvoted
      hasDownvoted
    }

    getRecursiveComments(
      movieId: $movieId
      parentId: $parentId
      limitAtDepth: $limitAtDepth
      maxDepth: $maxDepth
      page: $page
      pageSize: $pageSize
      orderDirection: $orderDirection
    ) {
      movieId
      parentId
      totalResults
      results {
        id
        userId
        movieId
        content
        createdAt
        updatedAt
        deletedAt
        parentId
        depth
        totalComments
        user {
          id
          email
          avatarUrl
          firstName
          lastName
        }
        voteRatio
        hasUpvoted
        hasDownvoted
      }
    }
  }
`);
