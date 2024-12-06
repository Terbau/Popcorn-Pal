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

export const UserSuggestion = ({
  item,
}: ForYouItemProps) => {
  const fullName = `${item.userFirstName} ${item.userLastName}`;
  const initials = createInitials(item.userFirstName, item.userLastName);
  const profileLink = `/profile/${item.userId}`;
  const textParts = [
    { text: "We recommend following" },
    { text: fullName, to: profileLink },
  ];

  return (
    <ForYouItemRoot>
      <ForYouItemLeftContainer>
        <ForYouAvatar to={profileLink} fallback={initials} />
        <ForYouItemTypeCircle
          bgColor="bg-blue-9"
          icon="mdi:user-outline"
          to={profileLink}
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
