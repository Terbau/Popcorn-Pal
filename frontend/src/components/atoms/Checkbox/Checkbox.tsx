import { cn } from "@/lib/utils/classUtils";
import { Icon } from "@iconify/react/dist/iconify.js";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { forwardRef } from "react";

export const Checkbox = forwardRef<
  HTMLButtonElement,
  RadixCheckbox.CheckboxProps
>(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(
      "dark:bg-brand-3 bg-cream h-6 w-6 rounded-md flex items-center justify-center shadow-md border border-purple-border dark:border-brand-6",
      "hover:border-brand-8 focus:ring-2 dark:focus:ring-brand-6 focus:ring-purple-lavender",
      className,
    )}
    {...props}
  >
    <RadixCheckbox.Indicator className="dark:text-brand-11 text-brand-9">
      <Icon icon="material-symbols:check" />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
));
