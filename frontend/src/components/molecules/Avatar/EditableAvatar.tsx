import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Avatar, type AvatarProps } from "./Avatar";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/classUtils";

type EditableAvatarProps = {
  isEditable?: boolean;
  label?: string;
  asChild?: boolean;
  component?: "button" | "span";
} & AvatarProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const EditableAvatar = forwardRef<
  HTMLButtonElement,
  EditableAvatarProps
>(
  (
    {
      src,
      alt,
      fallback,
      size,
      isEditable = true,
      label = "Edit",
      asChild,
      component: Component = "button",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : Component;

    const textSizeClass = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-base",
      "2xl": "text-lg",
      "3xl": "text-xl",
      "4xl": "text-xl",
      "5xl": "text-xl",
    }[size];

    return (
      <Comp
        className={cn("group rounded-full outline-0 cursor-pointer", className)}
        ref={ref}
        {...props}
      >
        <Slottable>{children}</Slottable>
        <Avatar
          src={src}
          alt={alt}
          fallback={fallback}
          size={size}
          className="group-focus:ring-2 group-focus:ring-brand-11 flex"
        >
          {isEditable && (
            <div
              className={cn(
                "hidden absolute inset-0 items-center grow justify-center bg-black bg-opacity-40 rounded-[inherit]",
                "group-focus:flex group-hover:flex",
              )}
            >
              <span className={cn("text-white", textSizeClass)}>{label}</span>
            </div>
          )}
        </Avatar>
      </Comp>
    );
  },
);
