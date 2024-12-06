import * as RadixDialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "cva";
import { cn } from "../../../lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

export interface SheetProps
  extends RadixDialog.DialogProps,
    VariantProps<typeof sheetStyles> {
  title?: string;
  description?: string;
  hasCloseButton?: boolean;
  className?: string;
}

export const Sheet = ({
  side = "left",
  title,
  description,
  hasCloseButton = true,
  className,
  children,
  ...props
}: SheetProps) => {
  return (
    <RadixDialog.Root {...props}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <RadixDialog.Content
          className={cn(
            sheetStyles({ side }),
            "flex flex-col gap-3 bg-cream dark:bg-brand-3",
            className,
          )}
        >
          {title && (
            <RadixDialog.Title className="text-2xl dark:text-brand-12 font-medium">
              {title}
            </RadixDialog.Title>
          )}
          {description && (
            <RadixDialog.Description className="text-sm">
              {description}
            </RadixDialog.Description>
          )}
          {children}
          {hasCloseButton && (
            <RadixDialog.Close asChild>
              <button
                type="button"
                className="absolute top-4 right-4 text-brand-10"
              >
                <Icon
                  icon="iconamoon:close"
                  className="h-8 w-8 text-brand-11 hover:text-brand-12"
                />
              </button>
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

const sheetStyles = cva({
  base: [
    "fixed z-50 gap-4 inset-y-0 bg-brand-3 p-6 shadow-lg h-full w-3/4 border-brand-5 transition ease-in-out ",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:duration-300",
    "sm:max-w-sm",
  ],
  variants: {
    side: {
      left: "left-0 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
      right:
        "right-0 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    },
  },
  defaultVariants: {
    side: "left",
  },
});
