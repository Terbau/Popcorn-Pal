import { cn } from "../../lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ScrollArea } from "./ScrollArea/ScrollArea";
import { LoadingButton } from "./LoadingButton/LoadingButton";
import * as RadixPopover from "@radix-ui/react-popover";

interface SearchResultDropdownProps extends RadixPopover.PopoverContentProps {
  amountSearchResults: number;
  totalSearchResults: number;
  isLoading?: boolean;
  canFetchMore?: boolean;
  isMobile?: boolean;
  showAmountText?: boolean;
  hasCloseButton?: boolean;
  onClose?: () => void;
  onFetchMore?: () => void;
}

export const SearchResultDropdown = ({
  amountSearchResults,
  totalSearchResults,
  isLoading = false,
  canFetchMore = false,
  isMobile = false,
  showAmountText = true,
  hasCloseButton = true,
  onClose,
  onFetchMore,
  className,
  children,
  ...props
}: SearchResultDropdownProps) => {
  return (
    <RadixPopover.Content
      onOpenAutoFocus={(e) => e.preventDefault()}
      onCloseAutoFocus={(e) => e.preventDefault()}
      className={cn(
        "w-full flex flex-col",
        { "h-screen": !isMobile },
        { "h-[calc(100vh-5.5rem)]": isMobile },
        className,
      )}
      {...props}
    >
      <ScrollArea orientation="vertical">
        <div
          className={cn(
            "h-full flex flex-col items-center",
            {
              "p-4 bg-brand-2 pb-28": !isMobile,
            },
            { "pb-12": isMobile },
          )}
        >
          <div className="flex flex-row justify-between mb-2 w-full">
            {showAmountText && (
              <span
                className={cn("font-semibold sm:text-lg", {
                  "w-full text-center": isMobile,
                })}
              >
                Showing {amountSearchResults} / {totalSearchResults} results
              </span>
            )}
            {!isMobile && hasCloseButton && (
              <button type="button" className="ml-auto">
                <Icon
                  icon="iconamoon:close"
                  className="h-8 w-8 text-brand-11 hover:text-brand-12"
                  onClick={onClose}
                />
              </button>
            )}
          </div>

          {children}
          {canFetchMore && amountSearchResults > 0 && (
            <LoadingButton
              className="mt-8 w-fit"
              variant="secondary"
              isLoading={isLoading}
              onClick={() => onFetchMore?.()}
            >
              Load more
            </LoadingButton>
          )}
        </div>
      </ScrollArea>
    </RadixPopover.Content>
  );
};
