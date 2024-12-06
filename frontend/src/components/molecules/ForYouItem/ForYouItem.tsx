import type { GetForYouItemsQuery } from "@/lib/graphql/generated/graphql";
import { cn, formatRelativeTime, type ArrayElement } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { forwardRef, type ReactNode, type ComponentProps } from "react";
import { CommentSuggestion } from "./Items/CommentSuggestion";
import { MovieSuggestion } from "./Items/MovieSuggestion";
import { UserSuggestion } from "./Items/UserSuggestion";
import { FollowingCommentedOnMovie } from "./Items/FollowingCommentedOnMovie";
import { FollowingAddedMovieToWatchlist } from "./Items/FollowingAddedMovieToWatchlist";
import { FollowingUpdatedWatchlistItem } from "./Items/FollowingUpdatedWatchlistItem";
import { FollowingStartedFollowingSomeoneElse } from "./Items/FollowingStartedFollowingSomeoneElse";
import { MovieImage, type MovieImageProps } from "../MovieImage/MovieImage";
import { Link, type LinkProps } from "react-router-dom";
import { StyledLink } from "@/components/atoms/StyledLink/StyledLink";
import { Avatar, type AvatarProps } from "../Avatar/Avatar";

type ForYouItem = ArrayElement<
  GetForYouItemsQuery["getForYouItems"]["results"]
>;

export interface ForYouItemProps extends ComponentProps<"div"> {
  item: ForYouItem;
}

export const ForYouItem = ({ item, ...props }: ForYouItemProps) => {
  const Comp =
    {
      MOVIE_SUGGESTION: MovieSuggestion,
      USER_SUGGESTION: UserSuggestion,
      COMMENT_SUGGESTION: CommentSuggestion,
      FOLLOWING_STARTED_FOLLOWING_SOMEONE_ELSE:
        FollowingStartedFollowingSomeoneElse,
      FOLLOWING_ADDED_MOVIE_TO_WATCHLIST: FollowingAddedMovieToWatchlist,
      FOLLOWING_UPDATED_WATCHLIST_ITEM: FollowingUpdatedWatchlistItem,
      FOLLOWING_COMMENTED_ON_MOVIE: FollowingCommentedOnMovie,
    }[item.type] ?? CommentSuggestion;

  return <Comp item={item} {...props} />;
};

export const ForYouItemRoot = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-row gap-6 bg-brand-3 border border-brand-6 rounded-md p-3",
        className,
      )}
      {...props}
    />
  ),
);

export const ForYouItemLeftContainer = forwardRef<
  HTMLDivElement,
  ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative h-fit w-fit", className)} {...props} />
));

export const ForYouItemRightContainer = forwardRef<
  HTMLDivElement,
  ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col justify-between gap-2", className)}
    {...props}
  />
));

export const ForYouItemHeader = forwardRef<
  HTMLDivElement,
  ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col justify-between gap-1", className)}
    {...props}
  />
));

type ForYouMovieImageProps = Omit<MovieImageProps, "alt"> &
  LinkProps & {
    alt?: string;
  };

export const ForYouMovieImage = forwardRef<
  HTMLAnchorElement,
  ForYouMovieImageProps
>(
  (
    {
      to,
      alt = "Movie poster",
      size = "xs",
      hasHoverEffect = false,
      className,
      ...props
    },
    ref,
  ) => (
    <Link ref={ref} to={to} className={className}>
      <MovieImage
        alt={alt}
        size={size}
        hasHoverEffect={hasHoverEffect}
        {...props}
      />
    </Link>
  ),
);

type ForYouAvatarProps = Omit<AvatarProps, "size"> &
  LinkProps & {
    size?: AvatarProps["size"];
  };

export const ForYouAvatar = forwardRef<HTMLAnchorElement, ForYouAvatarProps>(
  ({ size = "xl", to, className, ...props }, ref) => (
    <Link ref={ref} to={to} className={className}>
      <Avatar size={size} {...props} />
    </Link>
  ),
);

type ForYouItemTypeCircleProps = ComponentProps<"div"> &
  LinkProps & {
    bgColor: string;
    icon: string;
  };

export const ForYouItemTypeCircle = forwardRef<
  HTMLDivElement,
  ForYouItemTypeCircleProps
>(({ bgColor, icon, to, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute -top-6 -right-4 rounded-full h-8 w-8 sm:w-12 sm:h-12 flex items-center justify-center border-4 border-brand-3",
      bgColor,
      className,
    )}
    {...props}
  >
    <Link to={to}>
      <Icon icon={icon} className="sm:w-6 sm:h-6 text-brand-12" />
    </Link>
  </div>
));

interface ForYouTextPart {
  text: string | ReactNode;
  to?: string;
}

interface ForYouItemTitleProps extends ComponentProps<"h3"> {
  parts: ForYouTextPart[];
}

export const ForYouItemTitle = forwardRef<
  HTMLHeadingElement,
  ForYouItemTitleProps
>(({ parts, className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-bold text-base sm:text-lg flex flex-row gap-1",
      className,
    )}
    {...props}
  >
    {parts.map(({ text, to }, index) =>
      to ? (
        // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
        <StyledLink key={index} to={to}>
          {text}
        </StyledLink>
      ) : (
        // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
        <span key={index}>{text}</span>
      ),
    )}
  </h3>
));

export const ForYouItemDescription = forwardRef<
  HTMLParagraphElement,
  ComponentProps<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "line-clamp-2 flex flex-row gap-1 items-center text-sm sm:text-base",
      className,
    )}
    {...props}
  />
));

interface ForYouItemFooterProps extends ComponentProps<"p"> {
  prefix: string;
  time?: Date;
}

export const ForYouItemFooter = forwardRef<
  HTMLParagraphElement,
  ForYouItemFooterProps
>(({ prefix, time, className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs sm:text-sm text-brand-11 italic", className)}
    {...props}
  >
    <span className="mr-1">{prefix}</span>
    {time && formatRelativeTime(time)}
  </p>
));
