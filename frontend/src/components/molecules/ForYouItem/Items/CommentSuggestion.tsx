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

export const CommentSuggestion = ({ item, ...props }: ForYouItemProps) => {
  const fullName = `${item.userFirstName} ${item.userLastName}`;
  const movieLink = `/movie/${item.movieId}`;
  const commentLink = `/movie/${item.movieId}?commentId=${item.commentId}`;
  const profileLink = `/profile/${item.userId}`;
  const textParts = [
    { text: fullName, to: profileLink },
    { text: item.commentIsReply ? "replied to a comment on" : "commented on" },
    { text: item.movieTitle ?? "", to: movieLink },
  ];
  const action = item.commentIsReply ? "Replied" : "Commented";

  return (
    <ForYouItemRoot {...props}>
      <ForYouItemLeftContainer>
        <ForYouMovieImage to={movieLink} src={item.moviePosterUrl ?? ""} />
        <ForYouItemTypeCircle
          bgColor="bg-green-9"
          icon="iconamoon:comment"
          to={commentLink}
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
