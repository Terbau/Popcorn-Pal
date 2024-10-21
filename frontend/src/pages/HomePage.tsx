import { MainLayout } from "../components/layouts/MainLayout";
import { MovieCarousel } from "../components/molecules/MovieCarousel";
import { SlideShow } from "../components/molecules/SlideShow";
import { FilterableMovieSection } from "../components/organisms/FilterableMovieSection";
import { movies } from "../lib/mock";

export default function HomePage() {
  return (
    <MainLayout limitWidth={false} includePadding={false}>
      <SlideShow />
      <div className="max-w-screen-xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-center mt-12 mb-24">
          <MovieCarousel movieList={movies} componentHeader="Topp 10 filmer" />
        </div>
        <FilterableMovieSection />
      </div>
    </MainLayout>
  );
}
