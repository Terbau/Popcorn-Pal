import { gql } from "../generated";

export const CREATE_COMMENT = gql(`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      userId
      movieId
      content
      createdAt
      updatedAt
      deletedAt
      parentId
    }
  }  
`);

export const UPDATE_COMMENT = gql(`
  mutation UpdateComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      id
      userId
      movieId
      content
      createdAt
      updatedAt
      deletedAt
      parentId
    }
  }
`);

export const DELETE_COMMENT = gql(`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
      userId
      movieId
      content
      createdAt
      updatedAt
      deletedAt
      parentId
    }
  }
`);

export const UPSERT_COMMENT_VOTE = gql(`
  mutation UpsertCommentVote($commentId: ID!, $input: UpsertCommentVoteInput!) {
    upsertCommentVote(commentId: $commentId, input: $input) {
      commentId
      userId
      type
      createdAt
      updatedAt
    }
  }
`);

export const DELETE_COMMENT_VOTE = gql(`
  mutation DeleteCommentVote($commentId: ID!) {
    deleteCommentVote(commentId: $commentId)
  }
`);
