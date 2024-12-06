import {
  forwardRef,
  type ButtonHTMLAttributes,
  createContext,
  useContext,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "cva";
import { Icon, type IconProps } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils/classUtils";

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
  asChild?: boolean;
}

const ButtonContext = createContext<
  { size: VariantProps<typeof buttonStyles>["size"] } | undefined
>(undefined);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = "brand",
      variant = "primary",
      size = "md",
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
      <ButtonContext.Provider value={{ size }}>
        <Comp
          ref={ref}
          disabled={disabled}
          {...props}
          className={cn(
            buttonStyles({ variant, size }),
            color && getColorStyles(color, variant, disabled),
            className,
          )}
        >
          {children}
        </Comp>
      </ButtonContext.Provider>
    );
  },
);

interface ButtonIconProps extends IconProps {
  size?: VariantProps<typeof buttonStyles>["size"];
}

export const ButtonLeftIcon = forwardRef<SVGSVGElement, ButtonIconProps>(
  ({ size: sizeProp, className, ...props }, ref) => {
    const context = useContext(ButtonContext);
    const size = sizeProp ?? context?.size ?? "md";

    return (
      <Icon
        className={cn(getIconSizeStyles(size, "left"), className)}
        {...props}
        ref={ref}
      />
    );
  },
);

export const ButtonRightIcon = forwardRef<SVGSVGElement, ButtonIconProps>(
  ({ size: sizeProp, className, ...props }, ref) => {
    const context = useContext(ButtonContext);
    const size = sizeProp ?? context?.size ?? "md";

    return (
      <Icon
        className={cn(getIconSizeStyles(size, "right"), className)}
        {...props}
        ref={ref}
      />
    );
  },
);

export const buttonStyles = cva({
  base: "rounded-md outline-none cursor-pointer focus-within:ring-2 [&>*]:outline-none flex flex-row items-center gap-1 whitespace-nowrap",
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
      "responsive-sm": "px-1 py-0.5 sm:px-2 sm:py-1 text-xs",
      "responsive-md": "px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm",
      "responsive-lg":
        "px-3 py-1.5 sm:px-6 sm:py-3 xs:text-xs text-sm sm:text-base",
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
      return "w-4 h-4";
    case "md":
      return `w-6 h-6 ${iconAlignment === "left" ? "-ml-1" : "-mr-1"}`;
    case "lg":
      return `w-8 h-8 ${iconAlignment === "left" ? "-ml-2" : "-mr-2"}`;
    case "responsive-sm":
      return "w-3 h-3 sm:w-4 sm:h-4";
    case "responsive-md":
      return `w-4 h-4 sm:w-6 sm:h-6 ${
        iconAlignment === "left" ? "-ml-1" : "-mr-1"
      }`;
    case "responsive-lg":
      return `w-6 h-6 sm:w-8 sm:h-8 ${
        iconAlignment === "left" ? "-ml-2" : "-mr-2"
      }`;
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
        return `bg-gray-10 dark:bg-gray-7 text-gray-11 dark:text-gray-9 cursor-not-allowed focus-within:ring-0 ${overriddenTextColor}`;
      case "secondary":
        return "text-gray-10 dark:text-gray-8 bg-gray-11 dark:bg-gray-5 border border-gray-7 cursor-not-allowed focus-within:ring-0";
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
      return `dark:text-${color}-11 text-purple-text dark:bg-${color}-3 border hover:bg-cream-light transition duration-200 hover:border-purple-border hover:text-purple-medium dark:border-${color}-7 dark:hover:border-${color}-8 dark:focus-within:ring-${color}-7`;
    case "tertiary":
      return `dark:text-${color}-9 dark:hover:text-${color}-10 dark:focus-within:ring-${color}-7 text-purple-text hover:text-purple-medium focus-within:ring-purple-lavender`;
    default:
      throw new Error("Invalid variant");
  }
};
