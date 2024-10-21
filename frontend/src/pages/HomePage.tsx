import { gql, useQuery } from "@apollo/client";
import { MovieCarousel } from "../components/molecules/MovieCarousel";
import { SlideShow } from "../components/molecules/SlideShow";
import { FilterableMovieSection } from "../components/organisms/FilterableMovieSection";
import type { Query } from "../__generated__/types";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      genres
      posterUrl
    }
  }
`;

export default function HomePage() {
  const { data, loading, error } = useQuery<Pick<Query, "movies">>(GET_MOVIES);

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <SlideShow />
      <div className="max-w-screen-xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-center mt-12 mb-24">
          <MovieCarousel movieList={data.movies ?? []} label="Topp 10 filmer" />
        </div>
        <FilterableMovieSection movies={data.movies ?? []} />
      </div>
    </>
  );
}
