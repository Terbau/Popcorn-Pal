import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";
import { cva, type VariantProps } from "cva";

export type ButtonColor =
  | "brand"
  | "slate"
  | "red"
  | "blue"
  | "green"
  | "yellow";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  color?: ButtonColor;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = "brand",
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      asChild,
      disabled,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(
          buttonStyles({ variant, size }),
          color && getColorStyles(color, variant, disabled),
          className,
        )}
      >
        <div className="flex flex-row items-center gap-1">
          {leftIcon && (
            <span className={getIconSizeStyles(size, "left")}>{leftIcon}</span>
          )}
          {children}
          {rightIcon && (
            <span className={getIconSizeStyles(size, "right")}>
              {rightIcon}
            </span>
          )}
        </div>
      </Comp>
    );
  },
);

export const buttonStyles = cva({
  base: "rounded-md outline-none cursor-pointer focus-within:ring-2 [&>*]:outline-none",
  variants: {
    variant: {
      primary: "text-slate-12",
      secondary: "text-black",
      tertiary: "text-gray-9",
    },
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const getIconSizeStyles = (
  size: VariantProps<typeof buttonStyles>["size"],
  iconAlignment: "right" | "left",
) => {
  switch (size) {
    case "sm":
      return "[&>*]:w-4 [&>*]:h-4";
    case "md":
      return `[&>*]:w-6 [&>*]:h-6 ${iconAlignment === "left" ? "-ml-1" : "-mr-1"}`;
    case "lg":
      return `[&>*]:w-8 [&>*]:h-8 ${iconAlignment === "left" ? "-ml-2" : "-mr-2"}`;
    default:
      throw new Error("Invalid size");
  }
};

const colorsToOverrideText: ButtonColor[] = ["yellow"] as const;

const getColorStyles = (
  color: ButtonColor,
  variant: VariantProps<typeof buttonStyles>["variant"],
  disabled = false,
) => {
  const overriddenTextColor = colorsToOverrideText.includes(color)
    ? "text-slate-2"
    : "";

  if (disabled) {
    switch (variant) {
      case "primary":
        return `bg-gray-7 text-gray-9 cursor-not-allowed focus-within:ring-0 ${overriddenTextColor}`;
      case "secondary":
        return "text-gray-8 bg-gray-5 border border-gray-7 cursor-not-allowed focus-within:ring-0";
      case "tertiary":
        return "text-gray-8 cursor-not-allowed focus-within:ring-0";
      default:
        throw new Error("Invalid variant");
    }
  }

  switch (variant) {
    case "primary":
      return `bg-${color}-9 hover:bg-${color}-10 focus-within:ring-${color}-7 focus-within:ring-offset-2 ${overriddenTextColor}`;
    case "secondary":
      return `text-${color}-11 bg-${color}-3 border border-${color}-7 hover:border-${color}-8 focus-within:ring-${color}-7`;
    case "tertiary":
      return `text-${color}-9 hover:text-${color}-10 focus-within:ring-${color}-7`;
    default:
      throw new Error("Invalid variant");
  }
};
