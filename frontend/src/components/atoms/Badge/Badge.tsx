import type { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import { cva, type VariantProps } from "cva";

export type BadgeColor =
  | "brand"
  | "slate"
  | "red"
  | "blue"
  | "green"
  | "yellow";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

export const Badge = ({
  color = "brand",
  size = "md",
  variant = "primary",
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      {...props}
      className={cn(
        badgeStyles({ variant, size }),
        color && getColorStyles(color, variant),
        className,
      )}
    />
  );
};

export const badgeStyles = cva({
  base: "rounded-full",
  variants: {
    variant: {
      primary: "text-slate-12",
      secondary: "text-black",
      tertiary: "text-gray-9",
    },
    size: {
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
      return `text-${color}-11 bg-${color}-3 border border-${color}-7`;
    default:
      throw new Error("Invalid variant");
  }
};
