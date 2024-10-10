import { MainLayout } from "../components/layouts/MainLayout";
import { MovieCarousel } from "../components/molecules/MovieCarousel";
import { SlideShow } from "../components/molecules/SlideShow";
import { movies } from "../lib/mock";

export default function HomePage() {
  return (
    <MainLayout>
      <h1 className="text-white text-4xl font-semibold text-center">
        Home Page
      </h1>
      <SlideShow />
      <div className=" flex items-center justify-center h-screen">
        <MovieCarousel movieList={movies} componentHeader="Topp 10 filmer" />
      </div>
    </MainLayout>
  );
}
