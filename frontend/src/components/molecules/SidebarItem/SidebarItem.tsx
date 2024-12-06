import { Slot } from "@radix-ui/react-slot";
import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
} from "react";
import { Badge, type BadgeProps } from "../../atoms/Badge/Badge";
import { Icon, type IconProps } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils/classUtils";

interface SidebarItemProps extends HTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
  disabled?: boolean;
  asChild?: boolean;
}

// Make use of a context here in order for sub-components to know if the parent SidebarItem
// is disabled.
const SidebarItemContext = createContext<
  { disabled: SidebarItemProps["disabled"] } | undefined
>(undefined);

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  (
    {
      isSelected = false,
      disabled = false,
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <SidebarItemContext.Provider value={{ disabled }}>
        <Comp
          ref={ref}
          className={cn(
            "flex flex-row gap-3 dark:text-brand-12",
            { "text-brand-11": isSelected },
            className,
          )}
          {...props}
        />
      </SidebarItemContext.Provider>
    );
  },
);

interface SidebarItemLabelProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

export const SidebarItemLabel = forwardRef<
  HTMLSpanElement,
  SidebarItemLabelProps
>(({ asChild = false, className, ...props }, ref) => {
  const context = useContext(SidebarItemContext);
  const isDisabled = context?.disabled ?? false;

  const Comp = asChild && !isDisabled ? Slot : "span";
  return (
    <Comp
      ref={ref}
      className={cn(
        "text-lg",
        { "cursor-default pointer-events-none": isDisabled },
        className,
      )}
      {...props}
    />
  );
});

export const SidebarItemIcon = ({ className, ...props }: IconProps) => {
  return <Icon className={cn("h-6 w-6", className)} {...props} />;
};

export const SidebarItemBadge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, ...props }, ref) => {
    return (
      <Badge ref={ref} {...props}>
        {children}
      </Badge>
    );
  },
);
