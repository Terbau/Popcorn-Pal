import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
  type ComponentProps,
  useContext,
  useMemo,
} from "react";
import { Sheet } from "../molecules/Sheet/Sheet";
import { cn } from "@/lib/utils";
import { Skeleton } from "../atoms/Skeleton/Skeleton";
import { Pagination } from "../molecules/Pagination/Pagination";
import { Button } from "../atoms/Button/Button";
import { ToggleIcon } from "../molecules/ToggleIcon/ToggleIcon";
import { Select } from "../molecules/Select/Select";

export const ORDER_BY_OPTIONS = [
  "title",
  "externalRating",
  "runtime",
  "yearReleased",
] as const;
export const ORDER_DIRECTION_OPTIONS = ["asc", "desc"] as const;

export type OrderByOptions = (typeof ORDER_BY_OPTIONS)[number];
export type OrderDirectionOptions = (typeof ORDER_DIRECTION_OPTIONS)[number];

interface FilterableMovieListContextProps {
  totalResults: number;
  orderBy: OrderByOptions;
  onOrderByChange?: Dispatch<SetStateAction<OrderByOptions>>;
  orderDirection: OrderDirectionOptions;
  onOrderDirectionChange?: Dispatch<SetStateAction<OrderDirectionOptions>>;
  sidebarOpen: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  totalPages: number;
  firstResultForPage: number;
  lastResultForPage: number;
  isLoading?: boolean;
}

// This context is needed in order to share the state between the building components
// of the FilterableMovieList component.
const FilterableMovieListContext =
  createContext<FilterableMovieListContextProps | null>(null);

interface FilterableMovieListProps extends ComponentProps<"div"> {
  totalResults: number;
  orderBy: OrderByOptions;
  onOrderByChange?: Dispatch<SetStateAction<OrderByOptions>>;
  orderDirection: OrderDirectionOptions;
  onOrderDirectionChange?: Dispatch<SetStateAction<OrderDirectionOptions>>;
  pageSize: number;
  page: number;
  onPageChange?: Dispatch<SetStateAction<number>>;
  isLoading?: boolean;
}

export const FilterableMovieList = ({
  totalResults,
  orderBy,
  onOrderByChange,
  orderDirection,
  onOrderDirectionChange,
  pageSize,
  page,
  onPageChange,
  isLoading,
  className,
  children,
  ...props
}: FilterableMovieListProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalPages = Math.ceil(totalResults / pageSize);
  const firstResultForPage = (page - 1) * pageSize + 1;
  const lastResultForPage = Math.min(page * pageSize, totalResults);
  const resultsText =
    totalResults > 0
      ? `Showing ${firstResultForPage}-${lastResultForPage} of ${totalResults} results`
      : "Showing 0 results";

  return (
    <FilterableMovieListContext.Provider
      value={{
        totalResults,
        orderDirection,
        orderBy,
        onOrderByChange,
        onOrderDirectionChange,
        sidebarOpen,
        setSidebarOpen,
        totalPages,
        firstResultForPage,
        lastResultForPage,
        isLoading,
      }}
    >
      <div className={cn("", className)} {...props}>
        <div className="flex flex-row gap-8">{children}</div>
        <p className="dark:text-brand-11 text-purple-text mx-auto w-fit text-sm mt-4">
          {resultsText}
        </p>
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={(pageNum) => onPageChange?.(pageNum)}
            className="mt-4"
          />
        )}
      </div>
    </FilterableMovieListContext.Provider>
  );
};

export const FilterableMovieListSidebar = ({
  className,
  children,
  ...props
}: ComponentProps<"aside">) => {
  const context = useContext(FilterableMovieListContext);
  if (!context) {
    throw new Error(
      "FilterableMovieListSidebar must be used within a FilterableMovieList",
    );
  }

  const { sidebarOpen, setSidebarOpen } = context;

  return (
    <>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen} side="right">
        <aside className={cn("h-screen overflow-y-auto", className)} {...props}>
          {children}
        </aside>
      </Sheet>
      <aside
        className={cn(
          "hidden md:flex flex-col gap-8 sticky top-12 bottom-0 h-[calc(100vh-2rem)] pt-12 pb-10 overflow-y-auto pl-1 w-56 shrink-0",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  );
};

export const FilterableMovieListContent = ({
  className,
  children,
  ...props
}: ComponentProps<"section">) => {
  return (
    <section
      className={cn("md:mt-8 flex flex-col gap-2 md:gap-0 grow", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export const FilterableMovieListTitle = ({
  className,
  ...props
}: ComponentProps<"h1">) => {
  return <h1 className={cn("text-5xl font-bold", className)} {...props} />;
};

export const FilterableMovieListHeader = ({
  className,
  children,
  ...props
}: ComponentProps<"header">) => {
  const context = useContext(FilterableMovieListContext);
  if (!context) {
    throw new Error(
      "FilterableMovieListContent must be used within a FilterableMovieList",
    );
  }

  const {
    orderBy,
    onOrderByChange,
    orderDirection,
    onOrderDirectionChange,
    isLoading,
    setSidebarOpen,
  } = context;

  const orderByOptions = useMemo(
    () =>
      ORDER_BY_OPTIONS.map((option) => ({
        value: option,
        // Capitalize the first letter of the option and replace camel case with spaces
        label:
          option.charAt(0).toUpperCase() +
          option.slice(1).replace(/([A-Z])/g, " $1"),
      })),
    [],
  );

  return (
    <>
      <div className="mt-2 mb-8 mx-auto md:hidden">{children}</div>
      <header
        className={cn(
          "flex flex-col gap-2 md:flex-row md:items-end",
          className,
        )}
        {...props}
      >
        <div className="flex flex-row gap-1 items-end grow">
          <div className="hidden md:block">{children}</div>

          {isLoading ? (
            <Skeleton className="md:hidden h-10" />
          ) : (
            <Button
              className="md:hidden"
              variant="secondary"
              onClick={() => setSidebarOpen?.(true)}
            >
              Open filters
            </Button>
          )}
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-10 ml-auto" />
              <Skeleton className="h-10" />
            </>
          ) : (
            <>
              <ToggleIcon
                className="ml-auto"
                toggledIcon="lucide:sort-asc"
                untoggledIcon="lucide:sort-desc"
                pressed={orderDirection === "asc"}
                onClick={() =>
                  onOrderDirectionChange?.((prev) =>
                    prev === "asc" ? "desc" : "asc",
                  )
                }
              />
              <Select
                placeholder="Order by"
                value={orderBy}
                onValueChange={(value) =>
                  onOrderByChange?.(value as OrderByOptions)
                }
                options={orderByOptions}
                buttonProps={{ variant: "secondary" }}
              />
            </>
          )}
        </div>
      </header>
    </>
  );
};

export const FilterableMovieListContentList = ({
  className,
  children,
  ...props
}: ComponentProps<"ul">) => (
  <ul className={cn("flex flex-col gap-4 mt-4", className)} {...props}>
    {children}
  </ul>
);
