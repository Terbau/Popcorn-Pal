import {
  ForYouItemDescription,
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

export const FollowingCommentedOnMovie = ({ item }: ForYouItemProps) => {
  const fullName = `${item.userFirstName} ${item.userLastName}`;
  const movieLink = `/movie/${item.movieId}`;
  const profileLink = `/profile/${item.userId}`;
  const textParts = [
    { text: "Your friend" },
    { text: fullName, to: profileLink },
    {
      text: item.commentIsReply
        ? "replied to a comment on the movie"
        : "commented on the movie",
    },
    { text: item.movieTitle ?? "", to: movieLink },
  ];
  const action = item.commentIsReply ? "Replied" : "Commented";

  return (
    <ForYouItemRoot>
      <ForYouItemLeftContainer>
        <ForYouMovieImage to={movieLink} src={item.moviePosterUrl ?? ""} />
        <ForYouItemTypeCircle
          bgColor="bg-pink-9"
          icon="fluent:comment-add-20-regular"
          to={movieLink}
        />
      </ForYouItemLeftContainer>
      <ForYouItemRightContainer>
        <ForYouItemHeader>
          <ForYouItemTitle parts={textParts} />
          <ForYouItemDescription>"{item.commentContent}"</ForYouItemDescription>
        </ForYouItemHeader>
        <ForYouItemFooter prefix={action} time={item.timestamp} />
      </ForYouItemRightContainer>
    </ForYouItemRoot>
  );
};
