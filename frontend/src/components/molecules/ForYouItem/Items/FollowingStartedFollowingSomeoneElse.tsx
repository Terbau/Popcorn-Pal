import { createInitials } from "@/lib/utils";
import {
  ForYouAvatar,
  ForYouItemFooter,
  ForYouItemHeader,
  ForYouItemLeftContainer,
  ForYouItemRightContainer,
  ForYouItemRoot,
  ForYouItemTitle,
  ForYouItemTypeCircle,
  type ForYouItemProps,
} from "../ForYouItem";
import { Avatar } from "../../Avatar/Avatar";

export const FollowingStartedFollowingSomeoneElse = ({
  item,
}: ForYouItemProps) => {
  const fullName = `${item.userFirstName} ${item.userLastName}`;
  const targetFullName = `${item.targetUserFirstName} ${item.targetUserLastName}`;
  const initials = createInitials(item.userFirstName, item.userLastName);
  const targetInitials = createInitials(
    item.targetUserFirstName,
    item.targetUserLastName,
  );
  const profileLink = `/profile/${item.userId}`;
  const targetProfileLink = `/profile/${item.targetUserId}`;
  const textParts = [
    { text: "Your friend" },
    { text: fullName, to: profileLink },
    {
      text: "started following",
    },
    {
      text: (
        <Avatar
          size="sm"
          src={item.targetUserAvatarUrl ?? undefined}
          fallback={targetInitials}
        />
      ),
      to: targetProfileLink,
    },
    { text: targetFullName, to: targetProfileLink },
  ];

  return (
    <ForYouItemRoot>
      <ForYouItemLeftContainer>
        <ForYouAvatar to={profileLink} fallback={initials} />
        <ForYouItemTypeCircle
          bgColor="bg-red-9"
          icon="carbon:user-follow"
          to={profileLink}
        />
      </ForYouItemLeftContainer>
      <ForYouItemRightContainer>
        <ForYouItemHeader>
          <ForYouItemTitle parts={textParts} />
        </ForYouItemHeader>
        <ForYouItemFooter prefix="Started following" time={item.timestamp} />
      </ForYouItemRightContainer>
    </ForYouItemRoot>
  );
};
