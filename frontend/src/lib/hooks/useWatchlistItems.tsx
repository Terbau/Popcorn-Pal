import { type QueryHookOptions, useQuery } from "@apollo/client";
import type {
  GetWatchlistItemsQuery,
  GetWatchlistItemsQueryVariables,
} from "../graphql/generated/graphql";
import { GET_WATCHLIST_ITEMS } from "../graphql/queries/watchlist";
import type { WatchlistItemLabel } from "@/components/organisms/WatchlistItemLabel/WatchlistItemLabelSidebarFilter";

export const DEFAULT_MOVIES_ORDER_BY = "externalRating";
export const DEFAULT_MOVIES_ORDER_DIRECTION = "desc";
export const DEFAULT_MOVIES_PAGE_SIZE = 30;

export interface UseWatchlistItemsParams {
  userId: string;
  orderBy?: string;
  orderDirection?: string;
  page?: number;
  pageSize?: number;
  genres?: string[];
  labels?: WatchlistItemLabel[];
}

export const useWatchlistItems = (
  {
    userId,
    orderBy = DEFAULT_MOVIES_ORDER_BY,
    orderDirection = DEFAULT_MOVIES_ORDER_DIRECTION,
    page = 0,
    pageSize = DEFAULT_MOVIES_PAGE_SIZE,
    genres,
    labels,
  }: UseWatchlistItemsParams,
  options?: QueryHookOptions<
    GetWatchlistItemsQuery,
    GetWatchlistItemsQueryVariables
  >,
) => {
  const { data, ...rest } = useQuery(GET_WATCHLIST_ITEMS, {
    ...options,
    variables: {
      userId,
      orderBy,
      orderDirection,
      page,
      pageSize,
      genres,
      labels,
      ...options?.variables,
    },
  });

  return {
    watchlistItems: data?.getWatchlistItems.results ?? [],
    totalResults: data?.getWatchlistItems.totalResults ?? 0,
    ...rest,
  };
};
