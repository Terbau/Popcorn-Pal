import { MovieCarousel } from "../components/molecules/MovieCarousel/MovieCarousel";
import { useFeaturedMovies } from "@/lib/hooks/useFeaturedMovies";
import { useMovies } from "@/lib/hooks/useMovies";
import { InformationView } from "@/components/molecules/InformationView";
import { DiscoverAnimation } from "@/components/organisms/HomepageAnimations/DiscoverAnimation";
import { useAuth } from "@/lib/context/authContext";
import { WatchlistAnimation } from "@/components/organisms/HomepageAnimations/WatchlistAnimation";
import { ForYouAnimation } from "@/components/organisms/HomepageAnimations/ForYouAnimation";
import { SlideShow } from "@/components/molecules/SlideShow/SlideShow";

export default function HomePage() {
  const { currentUser } = useAuth();
  const { movies: featuredMovies } = useFeaturedMovies();
  const { movies: top10Movies, loading: top10MoviesLoading } = useMovies({
    orderBy: "externalRating",
    orderDirection: "desc",
    pageSize: 10,
  });
  useMovies({
    orderBy: "externalRating",
    orderDirection: "desc",
    pageSize: 30, // need pagination here in the future
  });

  return (
    <>
      <SlideShow movies={featuredMovies ?? []} />
      <div className=" mb-16">
        <div className="flex items-center justify-center mt-12 mb-4 max-w-screen-xl mx-auto w-[90vw]">
          <MovieCarousel
            movieList={top10Movies ?? []}
            isLoading={top10MoviesLoading}
            label="Top Movies"
          />
        </div>

        <div className="mt-10">
          <InformationView
            title="Discover movies"
            text="Explore a wide range of content tailored just for you."
            buttonLink="/discover"
            className="dark:bg-brand-3 bg-cream-light"
          >
            <DiscoverAnimation />
          </InformationView>
          <InformationView
            title="View a personalized feed"
            text="Get recommendations, view updates from your friends, and more."
            buttonLink="/discover"
            reverse={true}
          >
            <ForYouAnimation />
          </InformationView>
          <InformationView
            title="Track your watchlist"
            text="Save your movies to your watchlist and keep track of your watching status."
            buttonLink={
              currentUser ? `/watchlist/${currentUser?.id}` : "/signin"
            }
            className="dark:bg-brand-3 bg-cream-light"
          >
            <WatchlistAnimation />
          </InformationView>
        </div>
      </div>
    </>
  );
}
