import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import { cva, type VariantProps } from "cva";
import { Slot } from "@radix-ui/react-slot";

export type BadgeColor =
  | "brand"
  | "slate"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "orange";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  asChild?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color = "brand",
      size = "md",
      variant = "primary",
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        className={cn(
          badgeStyles({ variant, size }),
          color && getColorStyles(color, variant),
          className,
        )}
        {...props}
      />
    );
  },
);

export const badgeStyles = cva({
  base: "rounded-full h-fit whitespace-nowrap",
  variants: {
    variant: {
      primary: "text-slate-12",
      secondary: "text-black",
      tertiary: "text-gray-9",
    },
    size: {
      xs: "px-2 py-0.5 text-xs",
      sm: "px-3 py-1 text-xs",
      md: "px-3 py-1.5 text-sm",
      lg: "px-4 py-2 text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const colorsToOverrideText: BadgeColor[] = ["yellow"] as const;

const getColorStyles = (
  color: BadgeColor,
  variant: VariantProps<typeof badgeStyles>["variant"],
) => {
  const overriddenTextColor = colorsToOverrideText.includes(color)
    ? "text-slate-2"
    : "";

  switch (variant) {
    case "primary":
      return `bg-${color}-9 ${overriddenTextColor}`;
    case "secondary":
      return `text-${color}-11 bg-${color}-8 dark:bg-${color}-3 border border-${color}-10 dark:border-${color}-7`;
    default:
      throw new Error("Invalid variant");
  }
};
