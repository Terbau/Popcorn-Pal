import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  DeleteCommentVoteMutation,
  DeleteCommentVoteMutationVariables,
} from "../graphql/generated/graphql";
import { DELETE_COMMENT_VOTE } from "../graphql/mutations/comment";

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
    update: (cache) => {
      cache.modify({
        id: cache.identify({
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
    },
  });

  return [deleteCommentVote, other] as const;
};
