import { useGenres } from "@/lib/hooks/useGenres";
import {
  SidebarCheckboxFilter,
  type SidebarCheckboxFilterItemProps,
  type SidebarCheckboxFilterProps,
} from "../molecules/SidebarCheckboxFilter";
import { useMemo } from "react";
import type { SetState } from "ahooks/lib/createUseStorageState";

interface GenreSidebarFilterProps
  extends Omit<
    SidebarCheckboxFilterProps,
    "items" | "onItemClick" | "isAllChecked" | "onAllCheckedChange"
  > {
  genres: string[];
  onGenresChange?: (value?: SetState<string[]> | undefined) => void;
}

export const GenreSidebarFilter = ({
  title = "Genres",
  genres,
  onGenresChange,
  isLoading = false,
  ...props
}: GenreSidebarFilterProps) => {
  const { genres: allGenres, loading } = useGenres({
    onCompleted: (data) => {
      if (data.getGenres && genres.length === 0) {
        onGenresChange?.(data.getGenres.map((genre) => genre.id));
      }
    },
  });

  const genreOptions: SidebarCheckboxFilterItemProps[] = useMemo(() => {
    const options = allGenres.map((genre) => ({
      value: genre.id,
      label: genre.name,
      isChecked: genres.includes(genre.id),
    }));

    // Sort
    options.sort((a, b) => a.label.localeCompare(b.label));
    return options;
  }, [allGenres, genres]);

  const handleGenreItemClick = (item: SidebarCheckboxFilterItemProps) => {
    if (genres.includes(item.value)) {
      onGenresChange?.((prev) =>
        (prev ?? []).filter((genre) => genre !== item.value),
      );
    } else {
      onGenresChange?.((prev) => [...(prev ?? []), item.value]);
    }
  };

  const handleAllGenresCheckedChange = () => {
    if (genres.length === allGenres.length) {
      onGenresChange?.([]);
    } else {
      onGenresChange?.(allGenres.map((genre) => genre.id));
    }
  };

  return (
    <SidebarCheckboxFilter
      title={title}
      items={genreOptions}
      onItemClick={handleGenreItemClick}
      isAllChecked={genres.length === allGenres.length}
      onAllCheckedChange={handleAllGenresCheckedChange}
      isLoading={loading || isLoading}
      {...props}
    />
  );
};
