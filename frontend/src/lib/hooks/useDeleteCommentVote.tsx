import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  DeleteCommentVoteMutation,
  DeleteCommentVoteMutationVariables,
} from "../graphql/generated/graphql";
import { DELETE_COMMENT_VOTE } from "../graphql/mutations/comment";
import { apolloClient } from "../graphql/apolloClient";

interface UseDeleteCommentVoteProps {
  commentId: string;
  type?: "UPVOTE" | "DOWNVOTE";
}

export const useDeleteCommentVote = (
  { commentId, type }: UseDeleteCommentVoteProps,
  options?: MutationHookOptions<
    DeleteCommentVoteMutation,
    DeleteCommentVoteMutationVariables
  >,
) => {
  const [deleteCommentVote, other] = useMutation(DELETE_COMMENT_VOTE, {
    ...options,
    onCompleted: (args) => {
      try {
        apolloClient.cache.modify({
          id: apolloClient.cache.identify({
            __typename: "RecursiveComment",
            id: commentId,
          }),
          fields: {
            hasUpvoted() {
              return false;
            },
            hasDownvoted() {
              return false;
            },
            voteRatio(existing) {
              return existing - (type === "UPVOTE" ? 1 : -1);
            },
          },
        });
      } finally {
        options?.onCompleted?.(args);
      }
    },
  });

  return [deleteCommentVote, other] as const;
};
