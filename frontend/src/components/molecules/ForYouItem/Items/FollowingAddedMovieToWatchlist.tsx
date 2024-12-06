import { watchlistItemLabelsOptions } from "@/components/organisms/WatchlistItemLabel/WatchlistItemLabelPickerPopover";
import {
  ForYouItemFooter,
  ForYouItemHeader,
  ForYouItemLeftContainer,
  ForYouItemRightContainer,
  ForYouItemRoot,
  ForYouItemTitle,
  ForYouItemTypeCircle,
  ForYouMovieImage,
  type ForYouItemProps,
} from "../ForYouItem";
import { Badge } from "@/components/atoms/Badge/Badge";

export const FollowingAddedMovieToWatchlist = ({ item }: ForYouItemProps) => {
  const fullName = `${item.userFirstName} ${item.userLastName}`;
  const movieLink = `/movie/${item.movieId}`;
  const profileLink = `/profile/${item.userId}`;
  const textParts = [
    { text: "Your friend" },
    { text: fullName, to: profileLink },
    { text: "added" },
    { text: item.movieTitle ?? "", to: movieLink },
    { text: "to their watchlist!" },
  ];

  const watchlistItemOption = watchlistItemLabelsOptions.find(
    (option) => option.value === item.watchlistItemLabel,
  );

  return (
    <ForYouItemRoot>
      <ForYouItemLeftContainer>
        <ForYouMovieImage to={movieLink} src={item.moviePosterUrl ?? ""} />
        <ForYouItemTypeCircle
          bgColor="bg-teal-9"
          icon="mdi:movie-star-outline"
          to={movieLink}
        />
      </ForYouItemLeftContainer>
      <ForYouItemRightContainer>
        <ForYouItemHeader>
          <ForYouItemTitle parts={textParts} />
          <Badge
            size="xs"
            variant="secondary"
            color={watchlistItemOption?.color}
            className="w-fit"
          >
            {watchlistItemOption?.label}
          </Badge>
        </ForYouItemHeader>
        <ForYouItemFooter prefix="Added" time={item.timestamp} />
      </ForYouItemRightContainer>
    </ForYouItemRoot>
  );
};
