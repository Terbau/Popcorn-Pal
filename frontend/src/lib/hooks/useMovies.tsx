import { type QueryHookOptions, useQuery } from "@apollo/client";
import { GET_MOVIES } from "../graphql/queries/movie";
import type {
  GetMoviesQuery,
  GetMoviesQueryVariables,
} from "../graphql/generated/graphql";

export const DEFAULT_MOVIES_ORDER_BY = "externalRating";
export const DEFAULT_MOVIES_ORDER_DIRECTION = "desc";
export const DEFAULT_MOVIES_PAGE_SIZE = 30;

export interface UseMoviesParams {
  orderBy?: string;
  orderDirection?: string;
  page?: number;
  pageSize?: number;
  genres?: string[];
}

export const useMovies = (
  {
    orderBy = DEFAULT_MOVIES_ORDER_BY,
    orderDirection = DEFAULT_MOVIES_ORDER_DIRECTION,
    page = 0,
    pageSize = DEFAULT_MOVIES_PAGE_SIZE,
    genres,
  }: UseMoviesParams,
  options?: QueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>,
) => {
  const { data, ...rest } = useQuery(GET_MOVIES, {
    ...options,
    variables: {
      orderBy,
      orderDirection,
      page,
      pageSize,
      genres,
      ...options?.variables,
    },
  });

  return {
    movies: data?.getMovies.results ?? [],
    totalResults: data?.getMovies.totalResults ?? 0,
    ...rest,
  };
};
