import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
} from "../graphql/generated/graphql";
import { DELETE_COMMENT } from "../graphql/mutations/comment";
import { apolloClient } from "../graphql/apolloClient";

export const useDeleteComment = (
  options?: MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >,
) => {
  const [deleteComment, other] = useMutation(DELETE_COMMENT, {
    ...options,
    onCompleted: (args) => {
      try {
        apolloClient.cache.modify({
          id: apolloClient.cache.identify({
            __typename: "RecursiveComment",
            id: args.deleteComment.id,
          }),
          fields: {
            userId() {
              return args.deleteComment.userId;
            },
            content() {
              return args.deleteComment.content;
            },
            deletedAt() {
              return args.deleteComment.deletedAt;
            },
            user() {
              return null;
            },
          },
        });
      } finally {
        options?.onCompleted?.(args);
      }
    },
  });

  return [deleteComment, other] as const;
};
