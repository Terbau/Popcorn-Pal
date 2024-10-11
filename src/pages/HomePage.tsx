import { MainLayout } from "../components/layouts/MainLayout";
import { MovieCarousel } from "../components/molecules/MovieCarousel";
import { SlideShow } from "../components/molecules/SlideShow";
import { movies } from "../lib/mock";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="w-full">
        <SlideShow />{" "}
      </div>
      <div className=" flex items-center justify-center">
        <MovieCarousel movieList={movies} componentHeader="Topp 10 filmer" />
      </div>
    </MainLayout>
  );
}
