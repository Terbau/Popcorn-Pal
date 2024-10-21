import { gql, useQuery } from "@apollo/react-hooks";
import { MainLayout } from "../components/layouts/MainLayout";
import { MovieCarousel } from "../components/molecules/MovieCarousel";
import { SlideShow } from "../components/molecules/SlideShow";
import { FilterableMovieSection } from "../components/organisms/FilterableMovieSection";
import { movies } from "../lib/mock";
import { Movie } from "../lib/types";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      description
      releaseDate
      genres
      rating
      director
      cast
      runtime
      posterUrl
      comments {
        id
        user
        content
        date
      }
    }
  }
`;

export default function HomePage() {
  const { data, loading, error } = useQuery<{ movies: Movie[] }>(GET_MOVIES);
  console.log(data)

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <MainLayout limitWidth={false} includePadding={false}>
      <SlideShow />
      <div className="max-w-screen-xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-center mt-12 mb-24">
          <MovieCarousel movieList={movies} componentHeader="Topp 10 filmer" />
        </div>
        <FilterableMovieSection movies={data.movies} />
      </div>
    </MainLayout>
  );
}
