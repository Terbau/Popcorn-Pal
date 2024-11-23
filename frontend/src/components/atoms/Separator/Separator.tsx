import * as RadixSeparator from "@radix-ui/react-separator";
import { cn } from "../../../lib/utils";

interface SeparatorProps extends RadixSeparator.SeparatorProps {
  includeFullStretch?: boolean;
  includeMargin?: boolean;
}

export const Separator = ({
  includeFullStretch = true,
  includeMargin = true,
  className,
  ...props
}: SeparatorProps) => {
  return (
    <RadixSeparator.Root
      className={cn(
        "bg-brand-8 shrink-0 data-[orientation='horizontal']:h-px data-[orientation='vertical']:w-px",
        {
          "data-[orientation='horizontal']:w-full data-[orientation='vertical']:h-full":
            includeFullStretch,
        },
        {
          "data-[orientation='horizontal']:my-2 data-[orientation='vertical']:mx-2":
            includeMargin,
        },
        className,
      )}
      {...props}
    />
  );
};
