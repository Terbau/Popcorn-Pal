import { Button, type ButtonProps } from "@/components/atoms/Button/Button";
import { cn } from "@/lib/utils/classUtils";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { ComponentProps } from "react";

interface PaginationProps extends ComponentProps<"nav"> {
  totalPages: number;
  currentPage: number;
  amountShowOnLeft?: number;
  amountShowOnRight?: number;
  hasMinPageButton?: boolean;
  hasMaxPageButton?: boolean;
  includeEllipsis?: boolean;
  scrollToTopOnPageChange?: boolean;
  onPageChange?: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  amountShowOnLeft = 1,
  amountShowOnRight = 1,
  hasMinPageButton = true,
  hasMaxPageButton = true,
  includeEllipsis = true,
  scrollToTopOnPageChange = true,
  onPageChange,
  className,
  ...props
}: PaginationProps) => {
  // Create an array of page numbers from current page - amountShowOnLeft to current page + amountShowOnRight
  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (pageNum) =>
      pageNum <= currentPage + amountShowOnRight &&
      pageNum >= currentPage - amountShowOnLeft,
  );
  const hasLeftEllipsis = pageNums[0] > 1;
  const hasRightEllipsis = pageNums[pageNums.length - 1] < totalPages;

  const handlePageChange = (page: number) => {
    if (scrollToTopOnPageChange) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onPageChange?.(page);
  };

  return (
    <nav
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <ul className="flex flex-row gap-1 sm:gap-2 items-center">
        <li>
          <Button
            aria-label="Previous page"
            variant="tertiary"
            size="responsive-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
        </li>
        {hasLeftEllipsis && (
          <>
            {hasMinPageButton && (
              <li>
                <PaginationItem pageNum={1} onPageChange={handlePageChange} />
              </li>
            )}
            {includeEllipsis && (
              <li>
                <PaginationEllipsis />
              </li>
            )}
          </>
        )}
        {pageNums.map((pageNum) => (
          <li key={pageNum}>
            <PaginationItem
              pageNum={pageNum}
              isActive={currentPage === pageNum}
              onPageChange={handlePageChange}
            />
          </li>
        ))}
        {hasRightEllipsis && (
          <>
            {includeEllipsis && (
              <li>
                <PaginationEllipsis />
              </li>
            )}
            {hasMaxPageButton && (
              <li>
                <PaginationItem
                  pageNum={totalPages}
                  onPageChange={handlePageChange}
                />
              </li>
            )}
          </>
        )}
        <li>
          <Button
            aria-label="Next page"
            variant="tertiary"
            size="responsive-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
};

interface PaginationItemProps extends ButtonProps {
  pageNum: number;
  isActive?: boolean;
  onPageChange?: (page: number) => void;
}

const PaginationItem = ({
  pageNum,
  isActive,
  onPageChange,
  ...props
}: PaginationItemProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    size="responsive-md"
    variant="tertiary"
    onClick={() => onPageChange?.(pageNum)}
    className={cn({
      "border border-brand-8": isActive,
    })}
    {...props}
  >
    {pageNum}
  </Button>
);

const PaginationEllipsis = () => (
  <span aria-hidden>
    <Icon icon="lucide:more-horizontal" className="text-brand-10" />
    <span className="sr-only">More pages</span>
  </span>
);
