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

export const FollowingUpdatedWatchlistItem = ({ item }: ForYouItemProps) => {
  const fullName = `${item.userFirstName} ${item.userLastName}`;
  const movieLink = `/movie/${item.movieId}`;
  const profileLink = `/profile/${item.userId}`;
  const textParts = [
    { text: "Your friend" },
    { text: fullName, to: profileLink },
    {
      text: "updated",
    },
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
          bgColor="bg-orange-9"
          icon="material-symbols:movie-edit-outline-sharp"
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
        <ForYouItemFooter prefix="Updated" time={item.timestamp} />
      </ForYouItemRightContainer>
    </ForYouItemRoot>
  );
};
