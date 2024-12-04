import {
  SidebarCheckboxFilter,
  type SidebarCheckboxFilterItemProps,
  type SidebarCheckboxFilterProps,
} from "../../molecules/SidebarCheckboxFilter";
import { useEffect, useMemo } from "react";
import type { SetState } from "ahooks/lib/createUseStorageState";

export const watchlistItemLabels = [
  "WATCHING",
  "HAVE_WATCHED",
  "WANT_TO_WATCH",
] as const;

export type WatchlistItemLabel = (typeof watchlistItemLabels)[number];

export const watchlistItemLabelMap: Record<WatchlistItemLabel, string> = {
  WATCHING: "Watching",
  HAVE_WATCHED: "Have watched",
  WANT_TO_WATCH: "Want to watch",
} as const;

interface WatchlistItemLabelSidebarFilterProps
  extends Omit<
    SidebarCheckboxFilterProps,
    "items" | "onItemClick" | "isAllChecked" | "onAllCheckedChange"
  > {
  checkedWatchlistItemLabels: WatchlistItemLabel[];
  onCheckedWatchlistItemsLabelChange?: (
    value?: SetState<WatchlistItemLabel[]> | undefined,
  ) => void;
}

export const WatchlistItemLabelSidebarFilter = ({
  title = "Labels",
  checkedWatchlistItemLabels,
  onCheckedWatchlistItemsLabelChange,
  ...props
}: WatchlistItemLabelSidebarFilterProps) => {
  useEffect(() => {
    onCheckedWatchlistItemsLabelChange?.(watchlistItemLabels.slice());
  }, [onCheckedWatchlistItemsLabelChange]);

  const watchlistItemLabelOptions: SidebarCheckboxFilterItemProps[] =
    useMemo(() => {
      return watchlistItemLabels.map((watchlistItemLabel) => ({
        value: watchlistItemLabel,
        label: watchlistItemLabelMap[watchlistItemLabel],
        isChecked: checkedWatchlistItemLabels.includes(watchlistItemLabel),
      }));
    }, [checkedWatchlistItemLabels]);

  const handleItemClick = (item: SidebarCheckboxFilterItemProps) => {
    if (checkedWatchlistItemLabels.includes(item.value as WatchlistItemLabel)) {
      onCheckedWatchlistItemsLabelChange?.((prev) =>
        (prev ?? []).filter((label) => label !== item.value),
      );
    } else {
      onCheckedWatchlistItemsLabelChange?.((prev) => [
        ...(prev ?? []),
        item.value as WatchlistItemLabel,
      ]);
    }
  };

  const handleAllCheckedChange = () => {
    if (checkedWatchlistItemLabels.length === watchlistItemLabels.length) {
      onCheckedWatchlistItemsLabelChange?.([]);
    } else {
      onCheckedWatchlistItemsLabelChange?.(watchlistItemLabels.slice());
    }
  };

  return (
    <SidebarCheckboxFilter
      title={title}
      items={watchlistItemLabelOptions}
      onItemClick={handleItemClick}
      isAllChecked={
        checkedWatchlistItemLabels.length === watchlistItemLabels.length
      }
      onAllCheckedChange={handleAllCheckedChange}
      {...props}
    />
  );
};
