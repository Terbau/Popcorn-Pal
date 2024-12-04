import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  CreateWatchlistItemMutation,
  CreateWatchlistItemMutationVariables,
} from "../graphql/generated/graphql";
import { CREATE_WATCHLIST_ITEM } from "../graphql/mutations/watchlist";
import { GET_WATCHLIST_ITEM } from "../graphql/queries/watchlist";
import { resetWatchlistItemsResult } from "../utils/cacheUtils";

export const useCreateWatchlistItem = (
  options?: MutationHookOptions<
    CreateWatchlistItemMutation,
    CreateWatchlistItemMutationVariables
  >,
) => {
  const [createWatchlistItem, other] = useMutation(CREATE_WATCHLIST_ITEM, {
    ...options,
    update: (cache, { data }) => {
      const watchlistItem = data?.createWatchlistItem;
      if (!watchlistItem) return;

      cache.writeQuery({
        query: GET_WATCHLIST_ITEM,
        variables: {
          userId: watchlistItem.userId,
          movieId: watchlistItem.movieId,
        },
        data: {
          getWatchlistItem: watchlistItem,
        },
      });

      resetWatchlistItemsResult(watchlistItem.userId);
    },
  });

  return [createWatchlistItem, other] as const;
};
