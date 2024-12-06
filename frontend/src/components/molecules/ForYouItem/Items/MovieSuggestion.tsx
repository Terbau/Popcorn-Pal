import {
  ForYouItemFooter,
  ForYouItemHeader,
  ForYouItemLeftContainer,
  type ForYouItemProps,
  ForYouItemRightContainer,
  ForYouItemRoot,
  ForYouItemTitle,
  ForYouItemTypeCircle,
  ForYouMovieImage,
} from "../ForYouItem";

export const MovieSuggestion = ({ item, ...props }: ForYouItemProps) => {
  const movieLink = `/movie/${item.movieId}`;
  const textParts = [
    { text: "We recommend watching" },
    { text: item.movieTitle ?? "", to: movieLink },
  ];

  return (
    <ForYouItemRoot {...props}>
      <ForYouItemLeftContainer>
        <ForYouMovieImage to={movieLink} src={item.moviePosterUrl ?? ""} />
        <ForYouItemTypeCircle
          bgColor="bg-brand-9"
          icon="mdi:movie-outline"
          to={movieLink}
        />
      </ForYouItemLeftContainer>
      <ForYouItemRightContainer>
        <ForYouItemHeader>
          <ForYouItemTitle parts={textParts} />
        </ForYouItemHeader>
        <ForYouItemFooter prefix="Based on randomness" />
      </ForYouItemRightContainer>
    </ForYouItemRoot>
  );
};
