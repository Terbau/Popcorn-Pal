import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  DeleteWatchlistItemMutation,
  DeleteWatchlistItemMutationVariables,
} from "../graphql/generated/graphql";
import { DELETE_WATCHLIST_ITEM } from "../graphql/mutations/watchlist";
import { GET_WATCHLIST_ITEM } from "../graphql/queries/watchlist";
import { resetWatchlistItemsResult } from "../utils/cacheUtils";

interface UseDeleteWatchlistItem {
  userId: string;
}

export const useDeleteWatchlistItem = (
  { userId }: UseDeleteWatchlistItem,
  options?: MutationHookOptions<
    DeleteWatchlistItemMutation,
    DeleteWatchlistItemMutationVariables
  >,
) => {
  const [deleteWatchlistItem, other] = useMutation(DELETE_WATCHLIST_ITEM, {
    ...options,
    update: (cache, _, { variables }) => {
      cache.writeQuery({
        query: GET_WATCHLIST_ITEM,
        variables: {
          userId,
          movieId: variables?.movieId ?? "",
        },
        data: {
          getWatchlistItem: null,
        },
      });

      resetWatchlistItemsResult(userId);
    },
  });

  return [deleteWatchlistItem, other] as const;
};
