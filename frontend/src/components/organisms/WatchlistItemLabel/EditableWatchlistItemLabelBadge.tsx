import type { GetWatchlistItemQuery } from "@/lib/graphql/generated/graphql";
import {
  WatchlistItemLabelPickerPopover,
  watchlistItemLabelsOptions,
} from "./WatchlistItemLabelPickerPopover";
import type { WatchlistItemLabel } from "./WatchlistItemLabelSidebarFilter";
import { useUpdateWatchlistItem } from "@/lib/hooks/useUpdateWatchlistItem";
import { toast } from "react-toastify";
import { Badge, type BadgeProps } from "@/components/atoms/Badge/Badge";

interface EditableWatchlistItemLabelBadgeProps {
  watchlistItem: NonNullable<GetWatchlistItemQuery["getWatchlistItem"]>;
  isEditable?: boolean;
  badgeSize?: BadgeProps["size"];
}

export const EditableWatchlistItemLabelBadge = ({
  watchlistItem,
  isEditable = true,
  badgeSize = "md",
}: EditableWatchlistItemLabelBadgeProps) => {
  const label = watchlistItem.label as WatchlistItemLabel;
  const options = watchlistItemLabelsOptions.find(
    (option) => option.value === label,
  );

  const labelText = options?.label;
  const color = options?.color;

  const [updateWatchlistItem] = useUpdateWatchlistItem({
    onError: () => {
      toast.error("An error occurred while updating watchlist label");
    },
  });

  const handleLabelChange = (newLabel: WatchlistItemLabel) => {
    if (newLabel === label || !newLabel) return;
    updateWatchlistItem({
      variables: {
        movieId: watchlistItem.movieId,
        input: {
          label: newLabel,
        },
      },
    });
  };

  if (!isEditable) {
    return (
      <Badge variant="secondary" color={color ?? "brand"} size={badgeSize}>
        {labelText}
      </Badge>
    );
  }

  return (
    <WatchlistItemLabelPickerPopover
      label={label}
      onLabelChange={handleLabelChange}
    >
      <button type="button" aria-label="Edit watchlist label">
        <Badge variant="secondary" color={color ?? "brand"} size={badgeSize}>
          {labelText}
        </Badge>
      </button>
    </WatchlistItemLabelPickerPopover>
  );
};
