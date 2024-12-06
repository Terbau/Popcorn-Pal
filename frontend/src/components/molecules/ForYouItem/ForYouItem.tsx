import type { GetForYouItemsQuery } from "@/lib/graphql/generated/graphql";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  forwardRef,
  type ReactNode,
  type ComponentProps,
  createContext,
  useContext,
} from "react";
import { CommentSuggestion } from "./Items/CommentSuggestion";
import { MovieSuggestion } from "./Items/MovieSuggestion";
import { UserSuggestion } from "./Items/UserSuggestion";
import { FollowingCommentedOnMovie } from "./Items/FollowingCommentedOnMovie";
import { FollowingAddedMovieToWatchlist } from "./Items/FollowingAddedMovieToWatchlist";
import { FollowingUpdatedWatchlistItem } from "./Items/FollowingUpdatedWatchlistItem";
import { FollowingStartedFollowingSomeoneElse } from "./Items/FollowingStartedFollowingSomeoneElse";
import { MovieImage, type MovieImageProps } from "../MovieImage/MovieImage";
import type { LinkProps } from "react-router-dom";
import { StyledLink } from "@/components/atoms/StyledLink/StyledLink";
import { Avatar, type AvatarProps } from "../Avatar/Avatar";
import { OptionalLink } from "@/components/atoms/OptionalLink";
import type { ArrayElement } from "@/lib/utils/typeUtils";
import { cn } from "@/lib/utils/classUtils";
import { formatRelativeTime } from "@/lib/utils/dateUtils";

const ForYouItemMockContext = createContext<boolean>(false);

type ForYouItem = ArrayElement<
  GetForYouItemsQuery["getForYouItems"]["results"]
>;

export interface ForYouItemProps extends ComponentProps<"div"> {
  item: ForYouItem;
  mocked?: boolean;
}

export const ForYouItem = ({
  item,
  mocked = false,
  ...props
}: ForYouItemProps) => {
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

  return (
    <ForYouItemMockContext.Provider value={mocked}>
      <Comp item={item} {...props} />
    </ForYouItemMockContext.Provider>
  );
};

export const ForYouItemRoot = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    const mocked = useContext(ForYouItemMockContext);
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row gap-4 dark:bg-brand-3 bg-cream shadow-lg border border-purple-border dark:border-brand-6 rounded-md p-3",
          !mocked ? "sm:gap-6" : "p-2",
          className,
        )}
        {...props}
      />
    );
  },
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
  ) => {
    const mocked = useContext(ForYouItemMockContext);
    return (
      <OptionalLink ref={ref} to={to} className={className} disabled={mocked}>
        <MovieImage
          alt={alt}
          size={!mocked ? size : "xs"}
          overrideSizeChange={mocked}
          hasHoverEffect={hasHoverEffect}
          className={cn({ "ml-1": mocked })}
          {...props}
        />
      </OptionalLink>
    );
  },
);

type ForYouAvatarProps = Omit<AvatarProps, "size"> &
  LinkProps & {
    size?: AvatarProps["size"];
  };

export const ForYouAvatar = forwardRef<HTMLAnchorElement, ForYouAvatarProps>(
  ({ size = "xl", to, className, ...props }, ref) => {
    const mocked = useContext(ForYouItemMockContext);
    return (
      <OptionalLink ref={ref} to={to} className={className} disabled={mocked}>
        <Avatar size={!mocked ? size : "lg"} overrideSizeChange {...props} />
      </OptionalLink>
    );
  },
);

type ForYouItemTypeCircleProps = ComponentProps<"div"> &
  LinkProps & {
    bgColor: string;
    icon: string;
  };

export const ForYouItemTypeCircle = forwardRef<
  HTMLDivElement,
  ForYouItemTypeCircleProps
>(({ bgColor, icon, to, className, ...props }, ref) => {
  const mocked = useContext(ForYouItemMockContext);
  return (
    <div
      ref={ref}
      className={cn(
        "absolute rounded-full h-8 w-8 flex items-center justify-center border-[3px] border-cream dark:border-brand-3",
        bgColor,
        !mocked
          ? "-top-5 -right-3 sm:-top-6 sm:-right-4  sm:w-12 sm:h-12"
          : "-top-3 -right-2",
        className,
      )}
      {...props}
    >
      <OptionalLink to={to} disabled={mocked}>
        <Icon
          icon={icon}
          className={cn("text-brand-12", !mocked ? "sm:w-6 sm:h-6" : "")}
        />
      </OptionalLink>
    </div>
  );
});

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
>(({ parts, className, ...props }, ref) => {
  const mocked = useContext(ForYouItemMockContext);
  return (
    <h3
      ref={ref}
      className={cn(
        "font-bold dark:text-brand-12",
        !mocked ? "text-base sm:text-lg" : "text-sm",
        className,
      )}
      {...props}
    >
      <p className="space-x-1">
        {parts.map(({ text, to }, index) =>
          to ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
            <StyledLink key={index} to={to} disabled={mocked}>
              {text}
            </StyledLink>
          ) : (
            // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
            <span key={index}>{text}</span>
          ),
        )}
      </p>
    </h3>
  );
});

export const ForYouItemDescription = forwardRef<
  HTMLParagraphElement,
  ComponentProps<"p">
>(({ className, ...props }, ref) => {
  const mocked = useContext(ForYouItemMockContext);
  return (
    <p
      ref={ref}
      className={cn(
        "line-clamp-2 flex flex-row gap-1 items-center dark:text-brand-11",
        !mocked ? "text-sm sm:text-base" : "text-xs",
        className,
      )}
      {...props}
    />
  );
});

interface ForYouItemFooterProps extends ComponentProps<"p"> {
  prefix: string;
  time?: Date;
}

export const ForYouItemFooter = forwardRef<
  HTMLParagraphElement,
  ForYouItemFooterProps
>(({ prefix, time, className, ...props }, ref) => {
  const mocked = useContext(ForYouItemMockContext);
  return (
    <p
      ref={ref}
      className={cn(
        "dark:text-brand-11 italic",
        !mocked ? "text-xs sm:text-sm" : "text-xss",
        className,
      )}
      {...props}
    >
      <span className="mr-1">{prefix}</span>
      {time && formatRelativeTime(time)}
    </p>
  );
});
