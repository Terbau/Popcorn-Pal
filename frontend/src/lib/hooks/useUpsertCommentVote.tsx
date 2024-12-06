import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  UpsertCommentVoteMutation,
  UpsertCommentVoteMutationVariables,
} from "../graphql/generated/graphql";
import { UPSERT_COMMENT_VOTE } from "../graphql/mutations/comment";

// We need the current type in order to update the cache correctly.
export interface UseUpsertCommentVoteProps {
  type?: "UPVOTE" | "DOWNVOTE";
}

export const useUpsertCommentVote = (
  { type }: UseUpsertCommentVoteProps,
  options?: MutationHookOptions<
    UpsertCommentVoteMutation,
    UpsertCommentVoteMutationVariables
  >,
) => {
  const [upsertCommentVote, other] = useMutation(UPSERT_COMMENT_VOTE, {
    ...options,
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "RecursiveComment",
          id: data?.upsertCommentVote.commentId,
        }),
        fields: {
          hasUpvoted() {
            return data?.upsertCommentVote.type === "UPVOTE";
          },
          hasDownvoted() {
            return data?.upsertCommentVote.type === "DOWNVOTE";
          },
          voteRatio(existing) {
            const changeAmount = type !== undefined ? 2 : 1;

            return (
              existing +
              (data?.upsertCommentVote.type === "UPVOTE"
                ? changeAmount
                : -changeAmount)
            );
          },
        },
      });
    },
  });

  return [upsertCommentVote, other] as const;
};
