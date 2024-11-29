import {
  forwardRef,
  type ButtonHTMLAttributes,
  createContext,
  useContext,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";
import { cva, type VariantProps } from "cva";
import { Icon, type IconProps } from "@iconify/react/dist/iconify.js";

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

// Make use of a context here in order for other components such as ButtonLeftIcon and
// ButtonRightIcon to know the size of the parent button.
const ButtonContext = createContext<
  { size: VariantProps<typeof buttonStyles>["size"] } | undefined
>(undefined);

// This previously had a prop leftIcon and rightIcon, but it was removed as asChild
// requires only one child. The new solution uses another component pattern that is more
// like how Radix UI components are built. This way, the Button component can be used
// with a single child, and the ButtonLeftIcon and ButtonRightIcon components can be used
// as children of the Button component.
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
  base: "rounded-md outline-none cursor-pointer focus-within:ring-2 [&>*]:outline-none flex flex-row items-center gap-1",
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
