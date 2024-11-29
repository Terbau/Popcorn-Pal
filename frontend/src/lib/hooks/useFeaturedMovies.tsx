import { type QueryHookOptions, useQuery } from "@apollo/client";
import { GET_FEATURED_MOVIES } from "../graphql/queries/movie";
import type {
  GetFeaturedMoviesQuery,
  GetFeaturedMoviesQueryVariables,
} from "../graphql/generated/graphql";

export const useFeaturedMovies = (
  options?: QueryHookOptions<
    GetFeaturedMoviesQuery,
    GetFeaturedMoviesQueryVariables
  >,
) => {
  const { data, ...rest } = useQuery(GET_FEATURED_MOVIES, options);
  return {
    movies: data?.getFeaturedMovies ?? [],
    ...rest,
  };
};
