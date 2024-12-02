import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  UpdateCommentMutation,
  UpdateCommentMutationVariables,
} from "../graphql/generated/graphql";
import { UPDATE_COMMENT } from "../graphql/mutations/comment";
import { apolloClient } from "../graphql/apolloClient";

export const useUpdateComment = (
  options?: MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >,
) => {
  const [updateComment, other] = useMutation(UPDATE_COMMENT, {
    ...options,
    onCompleted: (args) => {
      try {
        apolloClient.cache.modify({
          id: apolloClient.cache.identify({
            __typename: "RecursiveComment",
            id: args.updateComment.id,
          }),
          fields: {
            content() {
              return args.updateComment.content;
            },
            updatedAt() {
              return args.updateComment.updatedAt;
            },
          },
        });
      } finally {
        options?.onCompleted?.(args);
      }
    },
  });

  return [updateComment, other] as const;
};
