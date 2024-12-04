import { type QueryHookOptions, useQuery } from "@apollo/client";
import type {
  GetWatchlistItemQuery,
  GetWatchlistItemQueryVariables,
} from "../graphql/generated/graphql";
import { GET_WATCHLIST_ITEM } from "../graphql/queries/watchlist";

export interface UseWatchlistItemParams {
  userId: string;
  movieId: string;
}

export const useWatchlistItem = (
  { userId, movieId }: UseWatchlistItemParams,
  options?: QueryHookOptions<
    GetWatchlistItemQuery,
    GetWatchlistItemQueryVariables
  >,
) => {
  const { data, ...rest } = useQuery(GET_WATCHLIST_ITEM, {
    ...options,
    variables: {
      userId,
      movieId,
      ...options?.variables,
    },
  });

  return {
    watchlistItem: data?.getWatchlistItem,
    ...rest,
  };
};
