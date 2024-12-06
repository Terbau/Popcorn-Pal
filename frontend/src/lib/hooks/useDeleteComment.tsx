import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
} from "../graphql/generated/graphql";
import { DELETE_COMMENT } from "../graphql/mutations/comment";

export const useDeleteComment = (
  options?: MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >,
) => {
  const [deleteComment, other] = useMutation(DELETE_COMMENT, {
    ...options,
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "RecursiveComment",
          id: data?.deleteComment.id,
        }),
        fields: {
          userId() {
            return data?.deleteComment.userId;
          },
          content() {
            return data?.deleteComment.content;
          },
          deletedAt() {
            return data?.deleteComment.deletedAt;
          },
          user() {
            return null;
          },
        },
      });
    },
  });

  return [deleteComment, other] as const;
};
