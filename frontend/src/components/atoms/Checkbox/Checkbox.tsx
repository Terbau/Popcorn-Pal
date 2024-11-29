import { cn } from "@/lib/utils";
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
      "bg-brand-3 h-6 w-6 rounded-md flex items-center justify-center shadow-md border border-brand-6",
      "hover:border-brand-8 focus:ring-2 focus:ring-brand-6",
      className,
    )}
    {...props}
  >
    <RadixCheckbox.Indicator className="text-brand-11">
      <Icon icon="material-symbols:check" />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
));
