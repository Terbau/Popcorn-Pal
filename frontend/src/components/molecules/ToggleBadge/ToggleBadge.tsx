import * as RadixToggle from "@radix-ui/react-toggle";
import { Badge, type BadgeProps } from "../../atoms/Badge/Badge";
import { cn } from "@/lib/utils/classUtils";

export type ToggleBadgeProps = RadixToggle.ToggleProps & BadgeProps;

export const ToggleBadge = ({
  size,
  color,
  variant,
  className,
  children,
  ...props
}: ToggleBadgeProps) => {
  return (
    <RadixToggle.Root
      className={cn("inline-flex items-center", className)}
      {...props}
    >
      <Badge size={size} color={color} variant={variant}>
        {children}
      </Badge>
    </RadixToggle.Root>
  );
};
