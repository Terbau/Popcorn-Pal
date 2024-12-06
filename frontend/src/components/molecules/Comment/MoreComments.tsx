import { Spinner } from "@/components/atoms/Spinner/Spinner";
import { cn } from "@/lib/utils/classUtils";
import type { ComponentProps } from "react";

interface MoreCommentsProps extends ComponentProps<"div"> {
  isLoading?: boolean;
  onClick?: () => void;
}

export const MoreComments = ({
  isLoading = false,
  className,
  onClick,
  ...props
}: MoreCommentsProps) => {
  return (
    <div className={cn("ml-4", className)} {...props}>
      <div className="bg-brand-10 h-2 w-px" />
      <div className="flex flex-row">
        <div className="h-6 w-6 border border-transparent border-b-brand-10 rounded-full rotate-45 -mt-3 -mr-3" />
        <div className="bg-brand-10 h-px w-2 mt-[11px]" />
        <button
          type="button"
          className="text-sm text-blue-11 ml-1 flex flex-row items-center gap-1 hover:text-blue-10 disabled:hover:text-blue-11"
          disabled={isLoading}
          onClick={onClick}
          aria-label="View more comments"
        >
          {isLoading && <Spinner />}
          {isLoading ? "Loading..." : "Load more..."}
        </button>
      </div>
    </div>
  );
};
