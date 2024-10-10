import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";
import { cva, type VariantProps } from "cva";

export type ButtonColor = "brand" | "slate" | "red" | "blue" | "green";

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
        {leftIcon && (
          <span className="[&>*]:w-6 [&>*]:h-6 mr-1 -ml-1">{leftIcon}</span>
        )}
        {children}
        {rightIcon && (
          <span className="[&>*]:w-6 [&>*]:h-6 -mr-1 ml-1">{rightIcon}</span>
        )}
      </Comp>
    );
  },
);

export const buttonStyles = cva({
  base: "flex flex-row items-center rounded-md outline-none focus:ring-2",
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

const getColorStyles = (
  color: ButtonColor,
  variant: VariantProps<typeof buttonStyles>["variant"],
  disabled = false,
) => {
  if (disabled) {
    switch (variant) {
      case "primary":
        return "bg-gray-7 text-gray-9 cursor-not-allowed focus:ring-0";
      case "secondary":
        return "text-gray-8 bg-gray-5 border border-gray-7 cursor-not-allowed focus:ring-0";
      case "tertiary":
        return "text-gray-8 cursor-not-allowed focus:ring-0";
      default:
        throw new Error("Invalid variant");
    }
  }

  switch (variant) {
    case "primary":
      return `bg-${color}-9 hover:bg-${color}-10 focus:ring-${color}-7 focus:ring-offset-2`;
    case "secondary":
      return `text-${color}-11 bg-${color}-3 border border-${color}-7 hover:border-${color}-8 focus:ring-${color}-7`;
    case "tertiary":
      return `text-${color}-9 hover:text-${color}-10 focus:ring-${color}-7`;
    default:
      throw new Error("Invalid variant");
  }
};
