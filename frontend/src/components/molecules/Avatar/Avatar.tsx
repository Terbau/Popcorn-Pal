import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "../../../lib/utils";
import { forwardRef } from "react";

export interface AvatarProps extends RadixAvatar.AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  overrideSizeChange?: boolean;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      size = "md",
      overrideSizeChange = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const originalHeightWidth = {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
      "2xl": "h-20 w-20",
      "3xl": "h-24 w-24",
      "4xl": "h-32 w-32",
      "5xl": "h-40 w-40",
    }[size];

    const heightWidth = {
      xs: "h-3 w-3 md:h-6 md:w-6",
      sm: "h-4 w-4 md:h-8 md:w-8",
      md: "h-6 w-6 md:h-10 md:w-10",
      lg: "h-8 w-8 md:h-12 md:w-12",
      xl: "h-10 w-10 md:h-16 md:w-16",
      "2xl": "h-12 w-12 md:h-20 md:w-20",
      "3xl": "h-16 w-16 md:h-24 md:w-24",
      "4xl": "h-20 w-20 md:h-32 md:w-32",
      "5xl": "h-28 w-28 md:h-40 md:w-40",
    }[size];

    const fallbackTextSize = {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
      "2xl": "text-xl",
      "3xl": "text-2xl",
      "4xl": "text-3xl",
      "5xl": "text-4xl",
    }[size];

    return (
      <RadixAvatar.Root
        key={src} // fix for fallback not being rendered when src changes to undefined
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center align-middle overflow-hidden select-none rounded-full bg-brand-3 relative shrink-0",
          overrideSizeChange ? originalHeightWidth : heightWidth,
          className,
        )}
        {...props}
      >
        {src && (
          <RadixAvatar.Image
            className="w-full h-full object-cover rounded-[inherit] shrink-0"
            src={src}
            alt={alt ?? fallback}
          />
        )}
        <RadixAvatar.Fallback
          className={cn(
            "w-full h-full flex items-center justify-center bg-brand-11 text-brand-5 font-medium",
            fallbackTextSize,
          )}
        >
          {fallback}
        </RadixAvatar.Fallback>
        {children}
      </RadixAvatar.Root>
    );
  },
);
