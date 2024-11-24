import { gql, useQuery } from "@apollo/client";
import { MovieCarousel } from "../components/molecules/MovieCarousel";
import { SlideShow } from "../components/molecules/SlideShow";
import { FilterableMovieSection } from "../components/organisms/FilterableMovieSection";
import type { Query } from "../__generated__/types";

const GET_MOVIES = gql`
  query GetMovies {
    allMovies: getMovies {
      id
      title
      genres
      posterUrl
    }

    top10Movies: getMovies(pageSize: 10, orderBy: "externalRating", orderDirection: "desc") {
      id
      title
      posterUrl
    }

    featuredMovies: getFeaturedMovies {
      id
      title
      yearReleased
      externalRating
      landscapePosterUrl
      landscapePosterHeight
      landscapePosterWidth
    }
  }
`;

type GetMovies = Pick<Query, "getMovies">["getMovies"];

export default function HomePage() {
  const { data, loading, error } = useQuery<{
    allMovies: GetMovies;
    top10Movies: GetMovies;
    featuredMovies: GetMovies;
  }>(GET_MOVIES);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <SlideShow movies={data?.featuredMovies ?? []} />
      <div className="max-w-screen-xl mx-auto w-[90vw] mb-16">
        <div className="flex items-center justify-center mt-12 mb-4 sm:mb-24">
          <MovieCarousel
            movieList={data?.top10Movies ?? []}
            isLoading={loading}
            label="Top Movies"
          />
        </div>
        <FilterableMovieSection
          movies={data?.allMovies ?? []}
          isLoading={loading}
        />
      </div>
    </>
  );
}
