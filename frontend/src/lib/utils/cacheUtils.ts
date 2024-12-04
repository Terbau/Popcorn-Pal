import { apolloClient } from "../graphql/apolloClient";

// This function is used to reset the cache for all the watchlist items for a
// specific user. This is used when a new watchlist item is created or an existing
// one is updated or deleted. This is necessary because the watchlist items are spread
// across multiple paginated queries and the cache needs to be reset to ensure that
// the watchlist items are correctly updated in the cache.
export const resetWatchlistItemsResult = (userId: string) => {
  const cache = apolloClient.cache;

  const allKeys = cache.extract();
  const queryKeys = allKeys.ROOT_QUERY;
  if (!queryKeys) return;

  for (const key of Object.keys(allKeys)) {
    if (key.startsWith("PaginatedWatchlistItemsResult")) {
      if (key.includes(`"userId":"${userId}"`)) {
        cache.evict({ id: key });
      }
    }
  }

  for (const queryKey of Object.keys(queryKeys)) {
    if (queryKey.startsWith("getWatchlistItems")) {
      if (queryKey.includes(`"userId":"${userId}"`)) {
        cache.evict({ id: queryKey });
      }
    }
  }
};
