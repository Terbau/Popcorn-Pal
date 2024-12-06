import { gql } from "../generated";

export const GET_FOR_YOU_ITEMS = gql(`
  query GetForYouItems($seed: Float!, $page: Int) {
    getForYouItems(seed: $seed, page: $page) {
      results {
        type
        userId
        userFirstName
        userLastName
        userAvatarUrl
        targetUserId
        targetUserFirstName
        targetUserLastName
        targetUserAvatarUrl
        movieId
        movieTitle
        moviePosterUrl
        commentId
        commentContent
        commentIsReply
        watchlistItemLabel
        timestamp
      }
      maybeHasMore
    }
  }
`);
