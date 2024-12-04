import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  UpdateWatchlistItemMutation,
  UpdateWatchlistItemMutationVariables,
} from "../graphql/generated/graphql";
import { UPDATE_WATCHLIST_ITEM } from "../graphql/mutations/watchlist";

export const useUpdateWatchlistItem = (
  options?: MutationHookOptions<
    UpdateWatchlistItemMutation,
    UpdateWatchlistItemMutationVariables
  >,
) => {
  const [updateWatchlistItem, other] = useMutation(UPDATE_WATCHLIST_ITEM, {
    ...options,
    update: (cache, { data }) => {
      const watchlistItem = data?.updateWatchlistItem;
      if (!watchlistItem) return;

      const userId = watchlistItem.userId;

      cache.modify({
        id: cache.identify({
          __typename: "WatchlistItem",
          userId,
          movieId: watchlistItem.movieId,
        }),
        fields: {
          label: () => watchlistItem.label,
          updatedAt: () => watchlistItem.updatedAt,
        },
      });
    },
  });

  return [updateWatchlistItem, other] as const;
};
