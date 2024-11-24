import { cn } from "../../lib/utils";
import { MovieSearchDropdown } from "./MovieSearchDropdown";
import * as RadixDialog from "@radix-ui/react-dialog";

interface MobileSearchOverlayProps extends RadixDialog.DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const MobileSearchOverlay = ({
  onOpenChange,
  ...props
}: MobileSearchOverlayProps) => {
  return (
    <RadixDialog.Root onOpenChange={onOpenChange} {...props}>
      <RadixDialog.Portal>
        <RadixDialog.Content
          className={cn(
            "fixed z-50 top-0 left-0 h-screen w-screen bg-primary px-4 py-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        >
          <MovieSearchDropdown
            isMobile
            onMobileOverlayClose={() => onOpenChange?.(false)}
          />
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
